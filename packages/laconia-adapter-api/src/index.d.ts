import {Adapter, AdapterFactory} from "@laconia/core";
import { apigateway as eventApiGateway } from "@laconia/event";

declare interface ErrorResponse {
  body?: any;
  headers?: eventApiGateway.ApiGatewayOutputHeaders;
  statusCode?: number;
}

declare interface ErrorMapping {
  (error: Error): ErrorResponse;
}

declare interface ErrorMappings {
  [errorNameRegex: string]: ErrorMapping;
}

declare interface ErrorMappingsMap extends Map<string, ErrorResponse> {}

declare namespace apigateway {
  interface AdapterFactoryOptions {
    inputType?: "params" | "body";
    responseStatusCode?: number;
    includeInputHeaders?: boolean;
    errorMappings?: ErrorMappings | Map<string, ErrorMapping>;
    responseAdditionalHeaders?: eventApiGateway.ApiGatewayOutputHeaders;
  }
  interface RouteOptions {
      mappings: Record<string, Adapter<any>>
  }

  function apigateway(options?: AdapterFactoryOptions): AdapterFactory<any>;
  function webSocket(): AdapterFactory<any>;
  function route(options: RouteOptions): Adapter<any>;
}

export = apigateway;
