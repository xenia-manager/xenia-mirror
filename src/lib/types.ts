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
  target_commitish: string;
  published_at: string;
  url: string;
  commit_url: string;
  changelog: Changelog;
  assets: Asset[];
}
