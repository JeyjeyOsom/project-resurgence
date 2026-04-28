import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'list_brands': { paramsTuple?: []; params?: {} }
    'create_brand': { paramsTuple?: []; params?: {} }
    'retrieve_brand': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_brand': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'delete_brand': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'retrieve_guideline': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
    'upsert_guideline': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
    'list_assets': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
    'upload_asset': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
    'download_asset': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_asset': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'delete_asset': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_compliance_checks': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
    'create_compliance_check': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
  }
  GET: {
    'list_brands': { paramsTuple?: []; params?: {} }
    'retrieve_brand': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'retrieve_guideline': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
    'list_assets': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
    'download_asset': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_compliance_checks': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
  }
  HEAD: {
    'list_brands': { paramsTuple?: []; params?: {} }
    'retrieve_brand': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'retrieve_guideline': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
    'list_assets': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
    'download_asset': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_compliance_checks': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
  }
  POST: {
    'create_brand': { paramsTuple?: []; params?: {} }
    'upsert_guideline': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
    'upload_asset': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
    'create_compliance_check': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
  }
  PUT: {
    'update_brand': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_asset': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'delete_brand': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'delete_asset': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}