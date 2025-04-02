// File: src/app/models/mission.ts
export interface Mission {
  flight_number: number;
  mission_name: string;
  mission_id?: string[];       
  launch_year: string;
  launch_success?: boolean;    
  land_success?: boolean;     
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
  };
  launch_site?: {              
    site_name_long: string;
  };
}
