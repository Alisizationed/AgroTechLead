from fastapi import FastAPI, Query
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from xgboost import XGBClassifier
from xgboost import XGBRegressor

app = FastAPI(title="Prognoz API")

def poisk_cadastru(cr: str, th: int):
    d_cadastru_crop = pd.read_csv('cadastru_crop.csv')
    d_crop = pd.read_csv('crop.csv')
    d_raion = pd.read_csv('raion.csv')
    d_cadastru = pd.read_csv('cadastru.csv')[['cadastru_id', 'raion_id', 'hectare', 'longitude', 'latitude']]
    d_nature = pd.read_csv('datas2.csv')

    d_cadastru_crop['data_produced'] = pd.to_datetime(d_cadastru_crop['data_produced'])
    d_cadastru_crop['Year'] = d_cadastru_crop['data_produced'].dt.year
    d_cadastru_crop['Month'] = d_cadastru_crop['data_produced'].dt.month
    d_cadastru_crop['Day'] = d_cadastru_crop['data_produced'].dt.day
    d_cadastru_crop['DOY'] = d_cadastru_crop['data_produced'].dt.dayofyear

    datas = d_cadastru_crop.merge(d_cadastru, on='cadastru_id', how='left')
    datas = datas.merge(d_nature, on='raion_id', how='left')

    crop = d_crop[d_crop['crop_name'] == cr]['crop_id'].values[0]
    threshold = th

    if 'cadastru_crop_id' in datas.columns:
        datas = datas.drop(columns=['cadastru_crop_id'])

    target_col = 'cadastru_id'
    drop_from_features = {'data_produced', 'raion_id', target_col}
    feature_cols = [c for c in datas.columns if c not in drop_from_features]
    X = datas[feature_cols].copy()
    y_raw = datas[target_col].copy()

    obj_cols = X.select_dtypes(include=['object']).columns.tolist()
    for col in obj_cols:
        X[col] = X[col].astype('category').cat.codes

    le = LabelEncoder()
    y = le.fit_transform(y_raw)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, stratify=y
    )

    model = XGBClassifier(
        n_estimators=500,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        reg_lambda=1.0,
        n_jobs=4,
        eval_metric='mlogloss'
    )
    model.fit(X_train, y_train)

    lower = threshold * 0.9
    upper = threshold * 1.1

    subset = datas[datas['crop_id'] == crop].copy()
    subset_X = subset[feature_cols].copy()
    for col in obj_cols:
        subset_X[col] = subset_X[col].astype('category').cat.codes

    subset_pred_enc = model.predict(subset_X)
    subset['pred_cadastru_id'] = le.inverse_transform(subset_pred_enc.astype(int))

    filtered = subset[subset['quantity'].between(lower, upper)][['cadastru_id']].drop_duplicates()
    result = filtered.merge(d_cadastru, on='cadastru_id', how='left').merge(d_raion, on='raion_id', how='left')
    result.drop(columns=['horizon_ah_depth', 'raion_id'], inplace=True, errors="ignore")
    result = result[['raion_name', 'cadastru_id', 'longitude', 'latitude', 'hectare']]
    return result.to_dict(orient="records")



def prognoz(c_id, cr, mn):
    # Загружаем данные
    d_cadastru_crop = pd.read_csv('cadastru_crop.csv')
    d_crop = pd.read_csv('crop.csv')
    d_cadastru = pd.read_csv('cadastru.csv')[['cadastru_id', 'raion_id', 'hectare', 'longitude', 'latitude']]
    d_nature = pd.read_csv('datas2.csv')

    # Обработка даты
    d_cadastru_crop['data_produced'] = pd.to_datetime(d_cadastru_crop['data_produced'])
    d_cadastru_crop['Year'] = d_cadastru_crop['data_produced'].dt.year
    d_cadastru_crop['Month'] = d_cadastru_crop['data_produced'].dt.month

    # Объединяем с другими данными
    datas = d_cadastru_crop.merge(d_cadastru, on='cadastru_id', how='left')
    datas = datas.merge(d_nature, on='raion_id', how='left')

    # Определяем crop_id
    crop = d_crop[d_crop['crop_name'] == cr]['crop_id'].values[0]

    # Убираем лишние колонки
    if 'cadastru_crop_id' in datas.columns:
        datas = datas.drop(columns=['cadastru_crop_id'])

    # Фильтруем по культуре
    subset = datas[datas['crop_id'] == crop].copy()
    feature_cols = ['Year', 'Month', 'cadastru_id']
    X = subset[feature_cols].copy()
    y = subset['quantity'].copy()

    # Обучаем модель
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = XGBRegressor(
        n_estimators=600,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        reg_lambda=1.0,
        n_jobs=4,
        eval_metric='rmse'
    )
    model.fit(X_train, y_train)

    # Создаем датафрейм для прогноза на следующий год и месяц mn
    next_year = subset['Year'].max() + 1
    pred_df = pd.DataFrame({
        'Year': [next_year],
        'Month': [mn],
        'cadastru_id': [c_id]
    })

    # Предсказываем
    pred_df['pred_quantity'] = model.predict(pred_df[feature_cols])
    pred_df.drop(columns=['Year'], inplace=True)
    result = pred_df[['cadastru_id', 'Month', 'pred_quantity']]

    return result.to_dict(orient="records")




@app.get("/poisk_cadastru")
def get_poisk_cadastru(crop: str = Query(...), threshold: int = Query(...)):
    """
    ip/poisk_cadastru?crop=Apples&threshold=75000
    """
    try:
        result = poisk_cadastru(crop, threshold)
        return {"status": "ok", "count": len(result), "data": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}



@app.get("/prognoz")
def get_prognoz(id_cadastru: int = Query(...), crop: str = Query(...), month: int = Query(...)):
    """
    ip/prognoz?id_cadastru=1&crop=Wheat&month=8
    """
    try:
        result = prognoz(id_cadastru, crop, month)
        return {"status": "ok", "count": len(result), "data": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}