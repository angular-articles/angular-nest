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

type errorType = {
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

export type JsonApiResponse = data | errors;
