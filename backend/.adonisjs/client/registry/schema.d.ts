/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'list_brands': {
    methods: ["GET","HEAD"]
    pattern: '/api/brands'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/brands/list_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/brands/list_controller').default['handle']>>>
    }
  }
  'create_brand': {
    methods: ["POST"]
    pattern: '/api/brands'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/brand_validator').createBrandValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/brand_validator').createBrandValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/brands/create_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/brands/create_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'retrieve_brand': {
    methods: ["GET","HEAD"]
    pattern: '/api/brands/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/brands/retrieve_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/brands/retrieve_controller').default['handle']>>>
    }
  }
  'update_brand': {
    methods: ["PUT"]
    pattern: '/api/brands/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/brand_validator').updateBrandValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/brand_validator').updateBrandValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/brands/update_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/brands/update_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'delete_brand': {
    methods: ["DELETE"]
    pattern: '/api/brands/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/brands/delete_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/brands/delete_controller').default['handle']>>>
    }
  }
  'retrieve_guideline': {
    methods: ["GET","HEAD"]
    pattern: '/api/brands/:brandId/guidelines'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { brandId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/guidelines/retrieve_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/guidelines/retrieve_controller').default['handle']>>>
    }
  }
  'upsert_guideline': {
    methods: ["POST"]
    pattern: '/api/brands/:brandId/guidelines'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/guideline_validator').updateGuidelineValidator)>>
      paramsTuple: [ParamValue]
      params: { brandId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/guideline_validator').updateGuidelineValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/guidelines/update_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/guidelines/update_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'list_assets': {
    methods: ["GET","HEAD"]
    pattern: '/api/brands/:brandId/assets'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { brandId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/assets/list_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/assets/list_controller').default['handle']>>>
    }
  }
  'upload_asset': {
    methods: ["POST"]
    pattern: '/api/brands/:brandId/assets'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/asset_validator').storeAssetValidator)>>
      paramsTuple: [ParamValue]
      params: { brandId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/asset_validator').storeAssetValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/assets/upload_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/assets/upload_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'download_asset': {
    methods: ["GET","HEAD"]
    pattern: '/api/assets/:id/download'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/assets/download_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/assets/download_controller').default['handle']>>>
    }
  }
  'update_asset': {
    methods: ["PUT"]
    pattern: '/api/assets/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/asset_validator').updateAssetValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/asset_validator').updateAssetValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/assets/update_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/assets/update_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'delete_asset': {
    methods: ["DELETE"]
    pattern: '/api/assets/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/assets/delete_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/assets/delete_controller').default['handle']>>>
    }
  }
  'list_compliance_checks': {
    methods: ["GET","HEAD"]
    pattern: '/api/brands/:brandId/checks'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { brandId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/compliance_checks/list_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/compliance_checks/list_controller').default['handle']>>>
    }
  }
  'create_compliance_check': {
    methods: ["POST"]
    pattern: '/api/brands/:brandId/check'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/compliance_check_validator').createComplianceCheckValidator)>>
      paramsTuple: [ParamValue]
      params: { brandId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/compliance_check_validator').createComplianceCheckValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/compliance_checks/create_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/compliance_checks/create_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
