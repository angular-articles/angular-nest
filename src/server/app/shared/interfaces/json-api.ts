interface base {
    jsonapi: {
        version: number
    }
}

interface source {
    pointer?: string;
    parameter?: string;
}

type dataType = object[] | object

export type errorType = {
    status: string;
    code: number;
    title: string;
    detail?: string;
    source?: source;
}

interface data extends base {
    data: dataType;
}

interface errors extends base {
    errors: errorType[];
}

export interface JsonApiArgs {
    data?: dataType;
    errors?: errorType[];
}

export type JsonApiResponse = data | errors;
