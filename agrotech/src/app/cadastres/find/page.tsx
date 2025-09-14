"use client";
import React from "react";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { TextField } from "@/components/ui/textfield";
import { useGetCadastruByCrop, useGetCadastruByLivestock } from "@/api/apiComponents";
import SubscribeButton from "@/components/ui/subscribe-button";
import CadastresList from "@/components/ui/cadastres-list";

const { fieldContext, formContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: { TextField },
  formComponents: { SubscribeButton },
  fieldContext,
  formContext,
});

const FindCadastre = () => {
  const [query, setQuery] = React.useState("");
  const [searchTriggered, setSearchTriggered] = React.useState(false);

  const { data: cropData, isLoading: loadingCrops, isError: errorCrops } = useGetCadastruByCrop(
    { queryParams: { crop: query } },
    { enabled: searchTriggered && !!query }
  );

  const { data: livestockData, isLoading: loadingLivestock, isError: errorLivestock } = useGetCadastruByLivestock(
    { queryParams: { livestock: query } },
    { enabled: searchTriggered && !!query }
  );

  const form = useAppForm({
    defaultValues: { search: "" },
    onSubmit: async ({ value }) => {
      setQuery(value.search);
      setSearchTriggered(true);
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await form.handleSubmit();
      }}
    >
      <form.Field
        name="search"
        validators={{
          onChange: ({ value }) => (!value ? "Query is required" : undefined),
        }}
      >
        {(field) => <TextField field={field} label="Search cadastre" />}
      </form.Field>

      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <SubscribeButton
            label={isSubmitting ? "Searching..." : "Search"}
            form={form}
            disabled={!canSubmit || isSubmitting}
          />
        )}
      </form.Subscribe>

      {(loadingCrops || loadingLivestock) && <p>Loading...</p>}
      {(errorCrops || errorLivestock) && <p>Error fetching results</p>}

      {searchTriggered && (
        <div className="mt-4 space-y-4">
          {cropData?.length != 0 && (
            <div>
              <h3 className="font-bold">Crops:</h3>
              <CadastresList data={cropData!} type="CadastruCrop"/>
            </div>
          )}
          {livestockData?.length != 0 && (
            <div>
              <h3 className="font-bold">Livestock:</h3>
              <CadastresList data={livestockData!} type="CadastruLivestock"/>
            </div>
          )}
          {cropData?.length == 0 && livestockData?.length == 0 && (
            <div>
              <h3 className="font-bold">No result found</h3>
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default FindCadastre;
