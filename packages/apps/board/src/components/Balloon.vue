<script setup lang="ts">
import type { Contest, SelectOptionItem, Submissions, Teams } from "@xcpcio/core";
import type { Contest as IContest, Submissions as ISubmissions, Teams as ITeams } from "@xcpcio/types";
import { Balloon, createContest, createSubmissions, createTeams, Rank } from "@xcpcio/core";

import { MultiSelect } from "vue-search-select";

import { BALLOON_TITLE_SUFFIX } from "~/composables/constant";

const props = defineProps<{
  dataSourceUrl: string;
}>();

const title = useTitle(BALLOON_TITLE_SUFFIX);
const { t } = useI18n();

const firstLoaded = ref(false);
const contestData = ref({} as Contest);
const teamsData = ref([] as Teams);
const submissionsData = ref([] as Submissions);
const rank = ref({} as Rank);
const now = useNow();

const locationOptions = computed(() => {
  return [...new Set(
    teamsData.value.filter(t => t.location).map(t => t.location),
  )].map(o => ({ value: o, text: o }));
});

const locationSelectedItems = ref<Array<SelectOptionItem>>([]);
const locationLastSelectItem = ref({});

function locationOnSelect(selectedItems: Array<SelectOptionItem>, lastSelectItem: SelectOptionItem) {
  locationSelectedItems.value = selectedItems;
  locationLastSelectItem.value = lastSelectItem;
}

function reBuildBalloons() {
  const newRank = new Rank(contestData.value, teamsData.value, submissionsData.value);
  newRank.buildBalloons();
  rank.value = newRank;
}

const { data, isError, error } = useQueryBoardData(props.dataSourceUrl, now);
watch(data, async () => {
  if (data.value === null || data.value === undefined) {
    return;
  }

  contestData.value = createContest(data.value?.contest as IContest);
  title.value = `${contestData.value.name} | ${BALLOON_TITLE_SUFFIX}`;

  teamsData.value = createTeams(data.value?.teams as ITeams);
  submissionsData.value = createSubmissions(data.value?.submissions as ISubmissions);

  reBuildBalloons();

  firstLoaded.value = true;
}, { immediate: true });

const balloons = computed(() => {
  return rank.value.balloons.filter((b) => {
    if (locationSelectedItems.value.length === 0) {
      return true;
    }
    return locationSelectedItems.value.some(o => o.value === b.team.location);
  }).sort(Balloon.compare).reverse();
});
</script>

<template>
  <div
    class="bg-[#323443]"
    text-gray-200
    w-screen h-screen
  >
    <div v-if="!firstLoaded">
      <div
        flex flex-col
        justify-center items-center
        w-screen h-screen
        text-xl italic
      >
        <div>
          {{ t("common.loading") }}...
        </div>

        <div v-if="isError">
          {{ error }}
        </div>
      </div>
    </div>

    <div
      v-else
    >
      <div
        flex flex-col
        justify-between
      >
        <div
          sticky top-0
          w-full h-15
          gap-3
          flex flex-row
          items-center
          bg-coolGray-600
          bg-opacity-80
        >
          <div
            ml-2
            text-size-xl
          >
            {{ t("balloons.location_filter") }}
          </div>
          <div
            w-690px
          >
            <MultiSelect
              :options="locationOptions"
              :selected-options="locationSelectedItems"
              placeholder="Location"
              @select="locationOnSelect"
            />
          </div>
        </div>
        <template
          v-for="(b, index) in balloons"
          :key="b.key"
        >
          <BalloonBlock
            :index="index"
            :balloon="b"
          />
        </template>
      </div>
    </div>
  </div>
</template>
