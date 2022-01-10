export interface Resources {
  data: Resource[];
}

export interface Resource {
  data: {
    title: string;
    url: string;
  };
}
