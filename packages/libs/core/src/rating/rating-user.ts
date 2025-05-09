import type { IRatingUser } from "@xcpcio/types";

import type { Persons } from "../person";
import type { RatingHistories } from "./rating-history";
import { Person } from "../person";
import { RatingHistory } from "./rating-history";

export class RatingUser {
  id: string;
  name: string;
  organization: string;

  members: Persons;
  coaches: Persons;

  rating: number;
  minRating: number;
  maxRating: number;

  rank: number;
  oldRating: number;

  seed: number;
  delta: number;

  ratingHistories: RatingHistories;

  constructor() {
    this.id = "";
    this.name = "";
    this.organization = "";

    this.members = [];
    this.coaches = [];

    this.rating = 0;
    this.minRating = 0x3F3F3F3F;
    this.maxRating = -0x3F3F3F3F;

    this.rank = 0;
    this.oldRating = 0;

    this.seed = 1.0;
    this.delta = 0;

    this.ratingHistories = [];
  }

  UpdateRating(rating: number) {
    this.rating = rating;
    this.minRating = Math.min(this.minRating, rating);
    this.maxRating = Math.max(this.maxRating, rating);
  }

  toJSON(): IRatingUser {
    return {
      id: this.id,
      name: this.name,
      organization: this.organization,

      members: this.members.map(member => member.toJSON()),
      coaches: this.coaches.map(coach => coach.toJSON()),

      rating: this.rating,
      minRating: this.minRating,
      maxRating: this.maxRating,

      ratingHistories: this.ratingHistories.map(ratingHistory => ratingHistory.toJSON()),
    };
  }

  static fromJSON(iRatingUser: IRatingUser | string): RatingUser {
    if (typeof iRatingUser === "string") {
      iRatingUser = JSON.parse(iRatingUser) as IRatingUser;
    }

    const ratingUser = new RatingUser();

    ratingUser.id = iRatingUser.id;
    ratingUser.name = iRatingUser.name;
    ratingUser.organization = iRatingUser.organization;

    ratingUser.members = iRatingUser.members.map(member => Person.fromJSON(member));
    ratingUser.coaches = iRatingUser.coaches.map(coach => Person.fromJSON(coach));

    ratingUser.rating = iRatingUser.rating;
    ratingUser.minRating = iRatingUser.minRating;
    ratingUser.maxRating = iRatingUser.maxRating;

    for (const iRatingHistory of iRatingUser.ratingHistories) {
      ratingUser.ratingHistories.push(RatingHistory.fromJSON(iRatingHistory));
    }

    return ratingUser;
  }
}

export type RatingUsers = Array<RatingUser>;
export type RatingUserMap = Map<string, RatingUser>;
