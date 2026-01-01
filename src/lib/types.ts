export interface Asset {
  name: string;
  url: string;
}

export interface Changelog {
  title: string;
  changes?: string;
}

export interface Release {
  tag_name: string;
  published_at: string;
  url: string;
  changelog: Changelog;
  assets: Asset[];
}
