import { DataSpeedAvg } from '../data/data.speed-avg';
import { DataPaceAvg } from '../data/data.pace-avg';
import { DataSwimPaceAvg } from '../data/data.swim-pace-avg';
import { DataPace } from '../data/data.pace';
import { DataSpeed } from '../data/data.speed';
import { DataSwimPace } from '../data/data.swim-pace';
import { DataGradeAdjustedPace } from '../data/data.grade-adjusted-pace';
import { DataGradeAdjustedPaceAvg } from '../data/data.grade-adjusted-pace-avg';
import { DataGradeAdjustedSpeed } from '../data/data.grade-adjusted-speed';
import { DataGradeAdjustedSpeedAvg } from '../data/data.grade-adjusted-speed-avg';
import { DataVerticalSpeed } from '../data/data.vertical-speed';

export class ActivityTypesHelper {
  static getActivityTypesAsUniqueArray(): string[] {
    return Array.from(
      new Set(
        Object.keys(ActivityTypes).reduce((array: string[], key: string) => {
          array.push(ActivityTypes[<keyof typeof ActivityTypes>key]); // Important get the key via the enum else it will be chaos
          return array;
        }, [])
      )
    ).sort((left, right) => {
      if (left < right) {
        return -1;
      }
      if (left > right) {
        return 1;
      }
      return 0;
    });
  }

  static getActivityTypeGroupsAsUniqueArray(): string[] {
    return Array.from(
      new Set(
        Object.keys(ActivityTypeGroups).reduce((array: string[], key: string) => {
          array.push(ActivityTypeGroups[<keyof typeof ActivityTypeGroups>key]); // Important get the key via the enum else it will be chaos
          return array;
        }, [])
      )
    ).sort((left, right) => {
      if (left < right) {
        return -1;
      }
      if (left > right) {
        return 1;
      }
      return 0;
    });
  }

  static averageSpeedDerivedDataTypesToUseForActivityType(activityType: ActivityTypes): string[] {
    switch (ActivityTypesHelper.getActivityGroupForActivityType(activityType)) {
      case ActivityTypeGroups.Running:
        return [DataPaceAvg.type, DataGradeAdjustedPaceAvg.type];
      case ActivityTypeGroups.TrailRunning:
        return [DataPaceAvg.type, DataGradeAdjustedPaceAvg.type, DataSpeedAvg.type, DataGradeAdjustedSpeedAvg.type];
      case ActivityTypeGroups.WaterSports:
        return [DataSpeedAvg.type, DataSwimPaceAvg.type];
      default:
        return [DataSpeedAvg.type];
    }
  }

  static speedDerivedDataTypesToUseForActivityType(activityType: ActivityTypes): string[] {
    switch (ActivityTypesHelper.getActivityGroupForActivityType(activityType)) {
      case ActivityTypeGroups.Running:
        return [DataPace.type, DataSpeed.type];
      case ActivityTypeGroups.TrailRunning:
        return [DataPace.type, DataSpeed.type];
      case ActivityTypeGroups.WaterSports:
        return [DataSpeed.type, DataSwimPace.type];
      default:
        return [DataSpeed.type];
    }
  }

  static altiDistanceSpeedDerivedDataTypesToUseForActivityType(activityType: ActivityTypes): string[] {
    switch (ActivityTypesHelper.getActivityGroupForActivityType(activityType)) {
      case ActivityTypeGroups.Running:
        return [DataGradeAdjustedPace.type];
      case ActivityTypeGroups.TrailRunning:
        return [DataGradeAdjustedPace.type, DataGradeAdjustedSpeed.type];
      default:
        return [];
    }
  }

  static verticalSpeedDerivedDataTypesToUseForActivityType(activityType: ActivityTypes): string[] {
    switch (ActivityTypesHelper.getActivityGroupForActivityType(activityType)) {
      case ActivityTypeGroups.Running:
      case ActivityTypeGroups.TrailRunning:
      case ActivityTypeGroups.Cycling:
      case ActivityTypeGroups.OutdoorAdventures:
      case ActivityTypeGroups.Performance:
        return [DataVerticalSpeed.type];
      default:
        return [];
    }
  }

  /**
   * Get's back the activity group an activity belongs to or returns unspecified activity group
   * @param activityType
   * This function can also be called: Fighting with a non functional language
   */
  static getActivityGroupForActivityType(activityType: ActivityTypes): ActivityTypeGroups {
    return ActivityTypeGroups[
      <keyof typeof ActivityTypeGroups>ActivityTypesHelper.getActivityTypeGroupsAsUniqueArray().find(
        activityTypeGroupString => {
          // Could also iterate over the map
          return ActivityTypesGroupMapping.map[
            ActivityTypeGroups[<keyof typeof ActivityTypeGroups>activityTypeGroupString]
          ].find((groupItem: ActivityTypes) => groupItem === activityType);
        }
      ) || ActivityTypeGroups.Unspecified
    ];
  }
}

/**
 * This enum works like a all matchers for normalized sport types between different naming across services
 *
 * It helps as you can call request an activity type with different namin eg .BackCountrySki or .BackCountrySkiing and get a uniform value
 * Also helps in case you have persited data that do not match or have been peristed wrongly
 *
 * Important: don't forget to declare the original string value aka: 'Running' = 'Running'
 *
 * @todo how do we write activity names? Is it Alpine skiing? or Alpine Skiing? For now I used uppercase each word
 */
export enum ActivityTypes {
  /**
   * Unknown sport
   */
  'unknown' = 'Unknown Sport',
  'Unknown sport' = 'Unknown Sport',
  'Unknown Sport' = 'Unknown Sport',
  'UnknownSport' = 'Unknown Sport',
  'undefined' = 'Unknown Sport',
  'Not specified sport' = 'Unknown Sport',
  /**
   * Other
   */
  'Other' = 'Other',
  /**
   * Generic
   */
  'generic' = 'Generic',
  'generic_exercise' = 'Generic',
  'generic_track_me' = 'Generic',
  'Generic' = 'Generic',
  /**
   * Transition
   */
  'transition' = 'Transition',
  'Transition' = 'Transition',
  /**
   * Fitness Equipment
   */
  'fitness_equipment' = 'Fitness Equipment',
  'Fitness Equipment' = 'Fitness Equipment',
  'FitnessEquipment' = 'Fitness Equipment',

  /**
   * Multisport
   */
  'Multisport' = 'Multisport',
  'MultiSport' = 'Multisport',
  'multisport' = 'Multisport',

  /**
   * Virtual Running
   */
  'running_virtual_activity' = 'Virtual Running',
  'VirtualRun' = 'Virtual Running',
  'Virtual running' = 'Virtual Running',
  'Virtual Running' = 'Virtual Running',
  'VirtualRunning' = 'Virtual Running',
  /**
   * Running
   */
  'Run' = 'Running',
  'run' = 'Running',
  'running_track' = 'Running',
  'running_trail' = 'Trail Running',
  'Running' = 'Running',
  'running' = 'Running',
  'running_street' = 'Running',
  'running_road' = 'Running',
  /**
   * Trail Running
   */
  'TrailRunning' = 'Trail Running',
  'Trail Running' = 'Trail Running',
  'Trail running' = 'Trail Running',
  'trail_running' = 'Trail Running',
  /**
   * Indoor Running
   */
  'Indoor running' = 'Indoor Running',
  'Indoor Running' = 'Indoor Running',
  'IndoorRunning' = 'Indoor Running',
  'running_indoor' = 'Indoor Running',
  'running_indoor_running' = 'Indoor Running',
  'training_indoor_running' = 'Indoor Running',
  /**
   * Cycling
   */
  'Cycling' = 'Cycling',
  'cycling' = 'Cycling',
  'cycling_road' = 'Cycling',
  'road_biking' = 'Cycling',
  'cycling_track_cycling' = 'Cycling',
  'cycling_gravel_cycling' = 'Cycling',
  'Biking' = 'Cycling',
  'biking' = 'Cycling',
  'Ride' = 'Cycling',
  'cycling_commuting' = 'Cycling',
  'cycling_mixed_surface' = 'Cycling',
  /**
   * Indoor Cycling
   */
  'cycling_indoor_cycling' = 'Indoor Cycling',
  'Indoorcycling' = 'Indoor Cycling',
  'indoor_cycling' = 'Indoor Cycling',
  'Indoor cycling' = 'Indoor Cycling',
  'IndoorCycling' = 'Indoor Cycling',
  'Indoor Cycling' = 'Indoor Cycling',
  /**
   * Virtual Cycling
   */
  'cycling_virtual_activity' = 'Virtual Cycling',
  'VirtualRide' = 'Virtual Cycling',
  'Virtual Cycling' = 'Virtual Cycling',
  'VirtualCycling' = 'Virtual Cycling',

  /**
   * E-Biking
   */
  'e_biking' = 'E-Biking',
  'E Biking' = 'E-Biking',
  'EBiking' = 'E-Biking',
  'E biking' = 'E-Biking',
  'EBikeRide' = 'E-Biking',
  'E-Biking' = 'E-Biking',
  /**
   * Mountain biking
   */
  'cycling_mountain' = 'Mountain Biking',
  'MountainBiking' = 'Mountain Biking',
  'Mountain Biking' = 'Mountain Biking',
  'cycling_cyclocross' = 'Mountain Biking',
  'mountain' = 'Mountain Biking', // @todo this feels hacky but exists and indeed it's MTB
  'Mountain biking' = 'Mountain Biking',
  /**
   * Motorcycling
   */
  'motorcycling' = 'Motorcycling',
  'Motorcycling' = 'Motorcycling',
  /**
   * Boating
   */
  'boating' = 'Boating',
  'Boating' = 'Boating',
  /**
   * Driving
   */
  'driving' = 'Driving',
  'Driving' = 'Driving',
  /**
   * Circuit training
   */
  'Circuit training' = 'Circuit Training',
  'Circuit Training' = 'Circuit Training',
  /**
   * Swimming
   */
  'Swimming' = 'Swimming',
  'swimming' = 'Swimming',
  'Swim' = 'Swimming',
  'swim' = 'Swimming',
  'swimming_lap_swimming' = 'Swimming',
  /**
   * Open Water Swimming
   */
  'swimming_open_water' = 'Open Water Swimming',
  'Open water swimming' = 'Open Water Swimming',
  'open water swimming' = 'Open Water Swimming',
  'Open Water Swimming' = 'Open Water Swimming',
  'OpenWaterSwimming' = 'Open Water Swimming',
  'open_water' = 'Open Water Swimming',
  /**
   * Basketball
   */
  'basketball' = 'Basketball',
  /**
   * Soccer
   */
  'soccer' = 'Soccer',
  'Soccer' = 'Soccer',
  /**
   * American Football
   */
  'american_football' = 'American Football',
  'American footBall' = 'American Football',
  'American Football' = 'American Football',
  'AmericanFootball' = 'American Football',
  /**
   * Skating
   */
  'Skating' = 'Skating',
  /**
   * Aerobics
   */
  'Aerobics' = 'Aerobics',
  /**
   * Yoga
   */
  'training_yoga' = 'Yoga',
  'yoga' = 'Yoga',
  'Yoga' = 'Yoga',
  'YogaPilates' = 'Yoga',

  /**
   * Pilates
   */
  'fitness_equipment_pilates' = 'Pilates',
  'Pilates' = 'Pilates',
  'pilates' = 'Pilates',
  /**
   * Trekking
   */
  'Trekking' = 'Trekking',
  'Trek' = 'Trekking',
  /**
   * Walking
   */
  'Walking' = 'Walking',
  'walking' = 'Walking',
  'walking_indoor' = 'Walking',
  'Walk' = 'Walking',
  'walk' = 'Walking',
  'walking_casual_walking' = 'Walking',
  'walking_indoor_walking' = 'Walking',
  /**
   * Sailing
   */
  'Sailing' = 'Sailing',
  'sailing' = 'Sailing',
  /**
   * Kayaking
   */
  'Kayaking' = 'Kayaking',
  'kayaking' = 'Kayaking',
  /**
   * Rafting
   */
  'rafting' = 'Rafting',
  'Rafting' = 'Rafting',
  /**
   * Rowing
   */
  'rowing' = 'Rowing',
  'Rowing' = 'Rowing',
  /**
   * Indoor Rowing
   */
  'fitness_equipment_indoor_rowing' = 'Indoor Rowing',
  'IndoorRowing' = 'Indoor Rowing',
  'Indoor Rowing' = 'Indoor Rowing',
  'indoor_rowing' = 'Indoor Rowing',
  'rowing_indoor' = 'Indoor Rowing',
  'rowing_indoor_rowing' = 'Indoor Rowing',
  /**
   * Climbing
   */
  'Climbing' = 'Climbing',
  /**
   * Triathlon
   */
  'Triathlon' = 'Triathlon',
  /**
   * Duathlon
   */
  'Duathlon' = 'Duathlon',
  /**
   * Aquathlon
   */
  'Aquathlon' = 'Aquathlon',
  /**
   * Alpine Skiing
   * https://en.wikipedia.org/wiki/Alpine_skiing
   */
  'Alpine skiing' = 'Alpine Skiing',
  'Alpine Skiing' = 'Alpine Skiing',
  'AlpineSkiing' = 'Alpine Skiing',
  'alpine_skiing' = 'Alpine Skiing',
  'AlpineSki' = 'Alpine Skiing',
  'downhill' = 'Alpine Skiing',
  'Downhill skiing' = 'Alpine Skiing',
  'DownhillSkiing' = 'Alpine Skiing',
  /**
   * Crosscountry Skiing
   * https://en.wikipedia.org/wiki/Cross-country_skiing
   */

  'Crosscountry Skiing' = 'Crosscountry Skiing',
  'Crosscountry skiing' = 'Crosscountry Skiing',
  'CrosscountrySkiing' = 'Crosscountry Skiing',
  'CrossCountrySkiing' = 'Crosscountry Skiing',
  'cross_country_skiing' = 'Crosscountry Skiing',
  'cross_country_skiing_skate_skiing' = 'Crosscountry Skiing',

  /**
   * Nordic skiing
   */
  'NordicSki' = 'Nordic Skiing',
  'Nordic skiing' = 'Nordic Skiing',
  'Nordic Skiing' = 'Nordic Skiing',
  /**
   * Backcountry Skiing
   * https://en.wikipedia.org/wiki/Backcountry_skiing
   */
  'Backcountry skiing' = 'Backcountry Skiing',
  'Backcountry Skiing' = 'Backcountry Skiing',
  'BackCountrySkiing' = 'Backcountry Skiing',
  'BackcountrySkiing' = 'Backcountry Skiing',
  'BackcountrySki' = 'Backcountry Skiing',
  'cross_country_skiing_backcountry' = 'Backcountry Skiing', // Hack for suunto
  'alpine_skiing_backcountry' = 'Backcountry Skiing', // Hack for suunto
  'backcountry' = 'Backcountry Skiing',
  'BackCountrySki' = 'Backcountry Skiing',
  /**
   * Ski Touring
   * https://en.wikipedia.org/wiki/Ski_touring
   */
  'Ski Touring' = 'Ski Touring',
  'SkiTouring' = 'Ski Touring',
  /**
   * Telemark Skiing
   */
  'Telemark skiing' = 'Telemark Skiing',
  'TelemarkSkiing' = 'Telemark Skiing',
  'Telemark Skiing' = 'Telemark Skiing',
  'cross_country_skiing_downhill' = 'Telemark Skiing',
  'alpine_skiing_downhill' = 'Telemark Skiing',
  /**
   * Roller Skiing
   */
  'Roller skiing' = 'Roller Skiing',
  'RollerSki' = 'Roller Skiing',
  'Roller Skiing' = 'Roller Skiing',
  /**
   * Snowboarding
   */
  'Snowboarding' = 'Snowboarding',
  'snowboarding' = 'Snowboarding',
  'Snowboard' = 'Snowboarding',
  /**
   * Weight training
   */
  'Weight Training' = 'Weight Training',
  'Weight training' = 'Weight Training',
  'WeightTraining' = 'Weight Training',
  /**
   * Basketball
   */
  'Basketball' = 'Basketball',
  /**
   * Ice Hockey
   */
  'Ice Hockey' = 'Ice Hockey',
  'IceHockey' = 'Ice Hockey',
  /**
   * Volleyball
   */
  'Volleyball' = 'Volleyball',
  /**
   * Football
   */
  'Football' = 'Football',
  /**
   * Softball
   */
  'Softball' = 'Softball',
  /**
   * Handball
   */
  'Handball' = 'Handball',
  /**
   * Cheerleading
   */
  'Cheerleading' = 'Cheerleading',
  /**
   * Baseball
   */
  'Baseball' = 'Baseball',
  /**
   * Tennis
   */
  'tennis' = 'Tennis',
  'Tennis' = 'Tennis',
  'tennis_match' = 'Tennis',
  /**
   * Badminton
   */
  'Badminton' = 'Badminton',
  /**
   * Table Tennis
   */
  'Table tennis' = 'Table Tennis',
  'Table Tennis' = 'Table Tennis',
  'TableTennis' = 'Table Tennis',
  /**
   * Racquet Ball
   */
  'racket' = 'Racquet Ball',
  'racquet_ball' = 'Racquet Ball',
  'Racquet Ball' = 'Racquet Ball',
  'RacquetBall' = 'Racquet Ball',
  'Racquet ball' = 'Racquet Ball',
  /**
   * Squash
   */
  'Squash' = 'Squash',
  /**
   * Combat sport
   */
  'Combat sport' = 'Combat',
  'Combat' = 'Combat',
  /**
   * Boxing
   */
  'Boxing' = 'Boxing',
  /**
   * Floorball
   */
  'Floorball' = 'Floorball',
  /**
   * Scuba Diving
   */
  'Scuba diving' = 'Scuba Diving',
  'Scuba Diving' = 'Scuba Diving',
  'ScubaDiving' = 'Scuba Diving',
  /**
   * Free Diving
   */
  'Free diving' = 'Free Diving',
  'Free Diving' = 'Free Diving',
  'FreeDiving' = 'Free Diving',
  /**
   * Diving
   */
  'diving' = 'Diving',
  'Diving' = 'Diving',
  'diving_apnea_hunting' = 'Diving',
  /**
   * Snorkeling
   */
  'Snorkeling' = 'Snorkeling',
  /**
   * Swimrun
   */
  'Swimrun' = 'Swimrun',
  /**
   * Adventure Racing
   */
  'Adventure Racing' = 'Adventure Racing',
  /**
   * Bowling
   */
  'Bowling' = 'Bowling',
  /**
   * Cricket
   */
  'Cricket' = 'Cricket',
  /**
   * Crosstrainer
   */
  'Crosstrainer' = 'Crosstrainer',
  /**
   * Dancing
   */
  'Dancing' = 'Dancing',
  /**
   * Golf
   */
  'Golf' = 'Golf',
  'golf' = 'Golf',
  /**
   * Hand Gliding
   */
  'hang_gliding' = 'Hang Gliding',
  'Hang gliding' = 'Hang Gliding',
  'HangGliding' = 'Hang Gliding',
  'Hang Gliding' = 'Hang Gliding',

  /**
   * Horseback Ridding
   */
  'horseback_riding' = 'Horseback Riding',
  'Horseback Riding' = 'Horseback Riding',
  'HorsebackRiding' = 'Horseback Riding',
  'Horseback riding' = 'Horseback Riding',
  /**
   * Gymnastics
   */
  'Gymnastics' = 'Gymnastics',
  /**
   * Ice Skating
   */
  'Ice Skating' = 'Ice Skating',
  'IceSkating' = 'Ice Skating',
  'ice_skating' = 'Ice Skating',
  'ice skating' = 'Ice Skating',
  'Ice skating' = 'Ice Skating',
  'IceSkate' = 'Ice Skating',
  'Ice Skate' = 'Ice Skating',
  /**
   * Canoeing
   */
  'Canoeing' = 'Canoeing',
  /**
   * Motorsports
   */
  'Motorsports' = 'Motorsports',
  /**
   * Mountaineering
   */
  'Mountaineering' = 'Mountaineering',
  'mountaineering' = 'Mountaineering',
  /**
   * Orienteering
   */
  'Orienteering' = 'Orienteering',
  'running_navigate' = 'Orienteering',
  'generic_navigate' = 'Orienteering',
  /**
   * Rugby
   */
  'Rugby' = 'Rugby',
  /**
   * Stretching
   */
  'Stretching' = 'Stretching',
  /**
   * Strength Training
   */
  'training_strength_training' = 'Strength Training',
  'fitness_equipment_strength_training' = 'Strength Training',
  'strength_training' = 'Strength Training',
  'Strength training' = 'Strength Training',
  'strength training' = 'Strength Training',
  'Strength Training' = 'Strength Training',
  'StrengthTraining' = 'Strength Training',
  'generic_strength_training' = 'Strength Training',
  /**
   * Track and Field
   */
  'TrackAndField' = 'Track and Field',
  'Track and Field' = 'Track and Field',
  /**
   * Nordic walking
   */
  'NordicWalking' = 'Nordic Walking',
  'Nordic Walking' = 'Nordic Walking',
  'Nordic walking' = 'Nordic Walking',
  /**
   * Snowshoeing
   */
  'Snow shoeing' = 'Snowshoeing',
  /**
   * Windsrufing
   */
  'Windsurfing/Surfing' = 'Windsurfing',
  'windsurfing' = 'Windsurfing',
  'Windsurfing' = 'Windsurfing',
  'Windsurf' = 'Windsurfing',
  /**
   * Kettlebell
   */
  'Kettlebell' = 'Kettlebell',
  /**
   * Paddling
   */
  'paddling' = 'Paddling',
  'Paddling' = 'Paddling',
  /**
   * Flying
   */
  'flying' = 'Flying',
  'Flying' = 'Flying',
  /**
   * Crossfit
   */
  'Cross fit' = 'Crossfit',
  'Cross Fit' = 'Crossfit',
  'cross_fit' = 'Crossfit',
  'Crossfit' = 'Crossfit',
  /**
   * Kitesurfing
   */
  'Kitesurfing/Kiting' = 'Kitesurfing',
  'kitesurfing' = 'Kitesurfing',
  'Kitesurfing' = 'Kitesurfing',
  'Kitesurf' = 'Kitesurfing',
  /**
   * Tactical
   */
  'tactical' = 'Tactical',
  'Tactical' = 'Tactical',
  /**
   * Jumpmaster
   */
  'jumpmaster' = 'Jumpmaster',
  'Jumpmaster' = 'Jumpmaster',
  /**
   * Boxing
   */
  'boxing' = 'Boxing',
  /**
   * Floor Climbing
   */
  'floor_climbing' = 'Floor Climbing',
  'Floor climbing' = 'Floor Climbing',
  'Floor Climbing' = 'Floor Climbing',
  'FloorClimbing' = 'Floor Climbing',
  /**
   * Paragliding
   */
  'Paragliding' = 'Paragliding',
  /**
   * Treadmill
   */
  'fitness_equipment_treadmill' = 'Treadmill',
  'running_treadmill' = 'Treadmill',
  'Treadmill' = 'Treadmill',
  'treadmill' = 'Treadmill',
  /**
   * Frisbee
   */
  'Frisbee' = 'Frisbee',
  /**
   * Indoor Training
   */
  'Indoor training' = 'Indoor Training',
  'Indoor Training' = 'Indoor Training',
  'IndoorTraining' = 'Indoor Training',
  /**
   * Hiking
   */
  'Hiking' = 'Hiking',
  'hiking_trail' = 'Hiking',
  'hiking' = 'Hiking',
  'hike' = 'Hiking',
  'Hike' = 'Hiking',

  /**
   * Canyoning
   */
  'canyoning' = 'Canyoning',
  'Canyoning' = 'Canyoning',

  /**
   * Via ferrata
   */
  'ViaFerrata' = 'Via Ferrata',
  'Via Ferrata' = 'Via Ferrata',
  'via Ferrata' = 'Via Ferrata',
  'via ferrata' = 'Via Ferrata',
  /**
   * Fishing
   */
  'Fishing' = 'Fishing',
  'fishing' = 'Fishing',
  /**
   * Hunting
   */
  'Hunting' = 'Hunting',
  'hunting' = 'Hunting',
  /**
   * Route
   */
  'route' = 'Route',
  'Route' = 'Route',
  /**
   * Inline Skating
   */
  'inline_skating' = 'Inline Skating',
  'InlineSkating' = 'Inline Skating',
  'Inline Skating' = 'Inline Skating',
  'Inline skating' = 'Inline Skating',
  'InlineSkate' = 'Inline Skating',
  /**
   * Rock Climbing
   */
  'rock_climbing' = 'Rock Climbing',
  'Rock Climbing' = 'Rock Climbing',
  'Rock climbing' = 'Rock Climbing',
  'RockClimbing' = 'Rock Climbing',
  /**
   * Sky Diving
   */
  'sky_diving' = 'Sky Diving',
  'Sky Diving' = 'Sky Diving',
  'Sky diving' = 'Sky Diving',
  'sky diving' = 'Sky Diving',
  'SkyDiving' = 'Sky Diving',
  /**
   * Snowshoeing
   */
  'snowshoeing' = 'Snowshoeing',
  'Snowshoeing' = 'Snowshoeing',
  'Snowshoe' = 'Snowshoeing',
  /**
   * Snowmobiling
   */
  'snowmobiling' = 'Snowmobiling',
  'Snowmobiling' = 'Snowmobiling',
  /**
   * Stand Up Paddling
   */
  'stand_up_paddleboarding' = 'Stand Up Paddling',
  'Standup paddling (SUP)' = 'Stand Up Paddling',
  'Stand up paddling' = 'Stand Up Paddling',
  'stand up paddling' = 'Stand Up Paddling',
  'Stand Up Paddling' = 'Stand Up Paddling',
  'Stand up Paddling' = 'Stand Up Paddling',
  'StandUpPaddling' = 'Stand Up Paddling',
  /**
   * Surfing
   */
  'surfing' = 'Surfing',
  'Surfing' = 'Surfing',
  /**
   * Wakeboarding
   */
  'wakeboarding' = 'Wakeboarding',
  'Wakeboarding' = 'Wakeboarding',
  /**
   * Water Skiing
   */
  'water_skiing' = 'Water Skiing',
  'Water skiing' = 'Water Skiing',
  'Water Skiing' = 'Water Skiing',
  'WaterSkiing' = 'Water Skiing',
  /**
   * Flexibility Training
   */
  'training_flexibility_training' = 'Flexibility Training',
  'flexibility_training' = 'Flexibility Training',
  'Flexibility Training' = 'Flexibility Training',
  'FlexibilityTraining' = 'Flexibility Training',
  'generic_flexibility_training' = 'Flexibility Training',
  /**
   * Training
   */
  'training' = 'Training',
  'Training' = 'Training',
  /**
   * Cardio Training
   */
  'cardio_training' = 'Cardio Training',
  'training_cardio_training' = 'Cardio Training',
  'Cardio Training' = 'Cardio Training',
  'CardioTraining' = 'Cardio Training',
  'fitness_equipment_cardio_training' = 'Cardio Training',
  /**
   * Elliptical trainer
   */
  'fitness_equipment_elliptical' = 'Elliptical Trainer',
  'Elliptical trainer' = 'Elliptical Trainer',
  'Elliptical' = 'Elliptical Trainer',
  'EllipticalTrainer' = 'Elliptical Trainer',
  'Elliptical Trainer' = 'Elliptical Trainer',
  /**
   * Hand Cycle
   */
  'Handcycle' = 'Hand Cycle',
  'Hand cycle' = 'Hand Cycle',
  'Hand Cycle' = 'Hand Cycle',
  /**
   * Stair Stepper
   */
  'StairStepper' = 'Stair Stepper',
  'Stair Stepper' = 'Stair Stepper',
  /**
   * Velomobile
   */
  'Velomobile' = 'Velomobile',
  /**
   * Wheel Chair
   */
  'Wheelchair' = 'Wheel Chair',
  'Wheel chair' = 'Wheel Chair',
  'Wheel Chair' = 'Wheel Chair',
  'Workout' = 'Workout',

  'generic_match' = 'Match',
  'Match' = 'Match'
}

export enum ActivityTypeGroups {
  'Running' = 'Running',
  'Trail Running' = 'Trail Running',
  'TrailRunning' = 'Trail Running',
  'Cycling' = 'Cycling',
  'Performance' = 'Performance',
  'Indoor Sports' = 'Indoor Sports',
  'IndoorSports' = 'Indoor Sports',
  'Outdoor Adventures' = 'Outdoor Adventures',
  'OutdoorAdventures' = 'Outdoor Adventures',
  'Winter Sports' = 'Winter Sports',
  'WinterSports' = 'Winter Sports',
  'Water Sports' = 'Water Sports',
  'WaterSports' = 'Water Sports',
  'Diving' = 'Diving',
  'Team Racket' = 'Team Racket',
  'TeamRacket' = 'Team Racket',
  'Unspecified' = 'Unspecified'
}

export class ActivityTypesGroupMapping {
  public static readonly map: { [key in ActivityTypeGroups]: ActivityTypes[] } = {
    [ActivityTypeGroups.Running]: [
      ActivityTypes.Running,
      ActivityTypes.Treadmill,
      ActivityTypes.IndoorRunning,
      ActivityTypes.VirtualRunning
      // @todo add more
    ],
    [ActivityTypeGroups.TrailRunning]: [
      ActivityTypes.TrailRunning
      // @todo add more
    ],
    [ActivityTypeGroups.Cycling]: [
      ActivityTypes.Cycling,
      ActivityTypes.IndoorCycling,
      ActivityTypes.MountainBiking,
      ActivityTypes.Biking,
      ActivityTypes.VirtualCycling,
      ActivityTypes.EBiking
      // @todo add more
    ],
    [ActivityTypeGroups.Performance]: [
      ActivityTypes.Crossfit,
      ActivityTypes.Orienteering,
      ActivityTypes.RollerSki,
      ActivityTypes.TrackAndField,
      ActivityTypes.Triathlon,
      ActivityTypes.Multisport
      // @todo add more
    ],
    [ActivityTypeGroups.IndoorSports]: [
      ActivityTypes.Gymnastics,
      ActivityTypes.Yoga,
      ActivityTypes.Stretching,
      ActivityTypes.Kettlebell,
      ActivityTypes.IndoorRowing,
      ActivityTypes.Floorball,
      ActivityTypes.Dancing,
      ActivityTypes.Crosstrainer,
      ActivityTypes.WeightTraining,
      ActivityTypes.StrengthTraining,
      ActivityTypes.Training,
      ActivityTypes.FlexibilityTraining
      // @todo add more
    ],
    [ActivityTypeGroups.OutdoorAdventures]: [
      ActivityTypes.Walking,
      ActivityTypes.Hiking,
      ActivityTypes.NordicWalking,
      ActivityTypes.HorsebackRiding,
      ActivityTypes.Climbing,
      ActivityTypes.RockClimbing,
      ActivityTypes.Canyoning,
      ActivityTypes.ViaFerrata
      // @todo add more
    ],
    [ActivityTypeGroups.WinterSports]: [
      ActivityTypes.CrosscountrySkiing,
      ActivityTypes.BackCountrySkiing,
      ActivityTypes.AlpineSkiing,
      ActivityTypes.TelemarkSkiing,
      ActivityTypes.Snowboarding,
      ActivityTypes.Snowshoeing,
      ActivityTypes.SkiTouring,
      ActivityTypes.IceSkating,
      ActivityTypes.BackCountrySki,
      ActivityTypes.NordicSki
      // @todo add more
    ],
    [ActivityTypeGroups.WaterSports]: [
      ActivityTypes.Rowing,
      ActivityTypes.Swimming,
      ActivityTypes.OpenWaterSwimming,
      ActivityTypes.Surfing,
      ActivityTypes.Kitesurfing,
      ActivityTypes.Wakeboarding,
      ActivityTypes.Sailing,
      ActivityTypes.Canoeing,
      ActivityTypes.Kayaking,
      ActivityTypes.Paddling,
      ActivityTypes.StandUpPaddling
      // @todo add more
    ],
    [ActivityTypeGroups.Diving]: [ActivityTypes.Diving, ActivityTypes.ScubaDiving, ActivityTypes.FreeDiving],
    [ActivityTypeGroups.TeamRacket]: [
      ActivityTypes.Golf,
      // ActivityTypes.Soccer,
      ActivityTypes.AmericanFootball,
      ActivityTypes.Football,
      ActivityTypes.Badminton,
      ActivityTypes.Baseball,
      ActivityTypes.Basketball,
      ActivityTypes.Bowling,
      ActivityTypes.Handball,
      ActivityTypes.IceHockey,
      ActivityTypes.Rugby,
      ActivityTypes.Softball,
      ActivityTypes.Squash,
      ActivityTypes.RacquetBall,
      ActivityTypes.TableTennis,
      ActivityTypes.Tennis
      // @todo add more
    ],
    [ActivityTypeGroups.Unspecified]: []
  };
}

export class ActivityTypesMoving {
  /**
   * Holds moving speed threshold in m/s per sport group
   */
  private static SPORTS_MOVING_SPEED_THRESHOLD_MAP = new Map<ActivityTypes, number>([
    [ActivityTypes.Running, 2 / 3.6], // m/s
    [ActivityTypes.Cycling, 7 / 3.6] // m/s
  ]);

  private static DEFAULT_MOVING_SPEED_THRESHOLD = 0.3; // m/s

  /**
   * Provides speed threshold by sport to compute moving time
   * @param activityType
   */
  static getSpeedThreshold(activityType: ActivityTypes): number {
    const threshold = this.SPORTS_MOVING_SPEED_THRESHOLD_MAP.get(activityType);
    return threshold && Number.isFinite(threshold) ? threshold : this.DEFAULT_MOVING_SPEED_THRESHOLD;
  }
}

export class StravaGPXTypes {
  public static readonly map: Map<number, ActivityTypes> = new Map<number, ActivityTypes>([
    [1, ActivityTypes.Cycling],
    [2, ActivityTypes.AlpineSki],
    [3, ActivityTypes.BackCountrySki],
    [4, ActivityTypes.Hiking],
    [6, ActivityTypes.InlineSkate],
    [7, ActivityTypes.NordicSki],
    [9, ActivityTypes.Running],
    [10, ActivityTypes.Walking],
    [12, ActivityTypes.Snowboard],
    [13, ActivityTypes.Snowshoeing],
    [16, ActivityTypes.Swimming],
    [17, ActivityTypes.VirtualCycling],
    [18, ActivityTypes.EBikeRide],
    [23, ActivityTypes.Rowing],
    [53, ActivityTypes.VirtualRunning]
  ]);
}
