/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cadastru } from '../models/Cadastru';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CadastruControllerService {
    /**
     * @param cadastru
     * @returns Cadastru OK
     * @throws ApiError
     */
    public static saveCadastru(
        cadastru: Cadastru,
    ): CancelablePromise<Cadastru> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cadastru',
            query: {
                'cadastru': cadastru,
            },
        });
    }
    /**
     * @param id
     * @returns Cadastru OK
     * @throws ApiError
     */
    public static getCadastru1(
        id: number,
    ): CancelablePromise<Cadastru> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cadastru/{id}',
            path: {
                'id': id,
            },
        });
    }
}
