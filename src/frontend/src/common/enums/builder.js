import Resources from "@/common/enums/resources";

export const BuilderCollection = {
  DOUGH: Resources.DOUGHS,
  SAUCES: Resources.SAUCES,
  INGREDIENTS: Resources.INGREDIENTS,
  SIZES: Resources.SIZES,
  MISC: Resources.MISC,
};

export const Limit = {
  COUNT_MAX: 3,
  COUNT_MIN: 0,
  COUNT_STEP: 1,
};

export const DefaultValue = {
  [Resources.DOUGHS]: 2,
  [Resources.SAUCES]: 1,
  [Resources.INGREDIENTS]: -1,
  [Resources.SIZES]: 2,
};
