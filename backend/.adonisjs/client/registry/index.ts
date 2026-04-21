/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'list_brands': {
    methods: ["GET","HEAD"],
    pattern: '/api/brands',
    tokens: [{"old":"/api/brands","type":0,"val":"api","end":""},{"old":"/api/brands","type":0,"val":"brands","end":""}],
    types: placeholder as Registry['list_brands']['types'],
  },
  'create_brand': {
    methods: ["POST"],
    pattern: '/api/brands',
    tokens: [{"old":"/api/brands","type":0,"val":"api","end":""},{"old":"/api/brands","type":0,"val":"brands","end":""}],
    types: placeholder as Registry['create_brand']['types'],
  },
  'retrieve_brand': {
    methods: ["GET","HEAD"],
    pattern: '/api/brands/:id',
    tokens: [{"old":"/api/brands/:id","type":0,"val":"api","end":""},{"old":"/api/brands/:id","type":0,"val":"brands","end":""},{"old":"/api/brands/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['retrieve_brand']['types'],
  },
  'update_brand': {
    methods: ["PUT"],
    pattern: '/api/brands/:id',
    tokens: [{"old":"/api/brands/:id","type":0,"val":"api","end":""},{"old":"/api/brands/:id","type":0,"val":"brands","end":""},{"old":"/api/brands/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['update_brand']['types'],
  },
  'delete_brand': {
    methods: ["DELETE"],
    pattern: '/api/brands/:id',
    tokens: [{"old":"/api/brands/:id","type":0,"val":"api","end":""},{"old":"/api/brands/:id","type":0,"val":"brands","end":""},{"old":"/api/brands/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['delete_brand']['types'],
  },
  'retrieve_guideline': {
    methods: ["GET","HEAD"],
    pattern: '/api/brands/:brandId/guidelines',
    tokens: [{"old":"/api/brands/:brandId/guidelines","type":0,"val":"api","end":""},{"old":"/api/brands/:brandId/guidelines","type":0,"val":"brands","end":""},{"old":"/api/brands/:brandId/guidelines","type":1,"val":"brandId","end":""},{"old":"/api/brands/:brandId/guidelines","type":0,"val":"guidelines","end":""}],
    types: placeholder as Registry['retrieve_guideline']['types'],
  },
  'upsert_guideline': {
    methods: ["POST"],
    pattern: '/api/brands/:brandId/guidelines',
    tokens: [{"old":"/api/brands/:brandId/guidelines","type":0,"val":"api","end":""},{"old":"/api/brands/:brandId/guidelines","type":0,"val":"brands","end":""},{"old":"/api/brands/:brandId/guidelines","type":1,"val":"brandId","end":""},{"old":"/api/brands/:brandId/guidelines","type":0,"val":"guidelines","end":""}],
    types: placeholder as Registry['upsert_guideline']['types'],
  },
  'list_assets': {
    methods: ["GET","HEAD"],
    pattern: '/api/brands/:brandId/assets',
    tokens: [{"old":"/api/brands/:brandId/assets","type":0,"val":"api","end":""},{"old":"/api/brands/:brandId/assets","type":0,"val":"brands","end":""},{"old":"/api/brands/:brandId/assets","type":1,"val":"brandId","end":""},{"old":"/api/brands/:brandId/assets","type":0,"val":"assets","end":""}],
    types: placeholder as Registry['list_assets']['types'],
  },
  'upload_asset': {
    methods: ["POST"],
    pattern: '/api/brands/:brandId/assets',
    tokens: [{"old":"/api/brands/:brandId/assets","type":0,"val":"api","end":""},{"old":"/api/brands/:brandId/assets","type":0,"val":"brands","end":""},{"old":"/api/brands/:brandId/assets","type":1,"val":"brandId","end":""},{"old":"/api/brands/:brandId/assets","type":0,"val":"assets","end":""}],
    types: placeholder as Registry['upload_asset']['types'],
  },
  'download_asset': {
    methods: ["GET","HEAD"],
    pattern: '/api/assets/:id/download',
    tokens: [{"old":"/api/assets/:id/download","type":0,"val":"api","end":""},{"old":"/api/assets/:id/download","type":0,"val":"assets","end":""},{"old":"/api/assets/:id/download","type":1,"val":"id","end":""},{"old":"/api/assets/:id/download","type":0,"val":"download","end":""}],
    types: placeholder as Registry['download_asset']['types'],
  },
  'update_asset': {
    methods: ["PUT"],
    pattern: '/api/assets/:id',
    tokens: [{"old":"/api/assets/:id","type":0,"val":"api","end":""},{"old":"/api/assets/:id","type":0,"val":"assets","end":""},{"old":"/api/assets/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['update_asset']['types'],
  },
  'delete_asset': {
    methods: ["DELETE"],
    pattern: '/api/assets/:id',
    tokens: [{"old":"/api/assets/:id","type":0,"val":"api","end":""},{"old":"/api/assets/:id","type":0,"val":"assets","end":""},{"old":"/api/assets/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['delete_asset']['types'],
  },
  'list_compliance_checks': {
    methods: ["GET","HEAD"],
    pattern: '/api/brands/:brandId/checks',
    tokens: [{"old":"/api/brands/:brandId/checks","type":0,"val":"api","end":""},{"old":"/api/brands/:brandId/checks","type":0,"val":"brands","end":""},{"old":"/api/brands/:brandId/checks","type":1,"val":"brandId","end":""},{"old":"/api/brands/:brandId/checks","type":0,"val":"checks","end":""}],
    types: placeholder as Registry['list_compliance_checks']['types'],
  },
  'create_compliance_check': {
    methods: ["POST"],
    pattern: '/api/brands/:brandId/check',
    tokens: [{"old":"/api/brands/:brandId/check","type":0,"val":"api","end":""},{"old":"/api/brands/:brandId/check","type":0,"val":"brands","end":""},{"old":"/api/brands/:brandId/check","type":1,"val":"brandId","end":""},{"old":"/api/brands/:brandId/check","type":0,"val":"check","end":""}],
    types: placeholder as Registry['create_compliance_check']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
