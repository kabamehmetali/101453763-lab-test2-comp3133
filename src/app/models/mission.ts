// File: src/app/models/mission.ts
export interface Mission {
  flight_number: number;
  mission_name: string;
  mission_id?: string[];
  launch_year: string;
  details: string;
  links: {
    mission_patch_small: string;
    article_link: string;
    wikipedia: string;
    video_link: string;
  };
  rocket: {
    rocket_name: string;
    rocket_type: string;
    first_stage?: {
      cores: Array<{
        land_success?: boolean | null;
      }>;
    };
  };
  launch_success?: boolean;
  // Some launches may provide a top-level land_success as well
  land_success?: boolean;
  launch_site?: {
    site_name_long: string;
  };
}
