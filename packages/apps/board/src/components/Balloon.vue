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

const locationInput = ref("");
const problemSelectedItems = ref<Array<SelectOptionItem>>([]);
const problemLastSelectItem = ref({});

const problemOptions = computed(() => {
  return contestData.value.problems.map((p) => {
    return { value: p.label, text: p.label + p.name };
  });
});

function problemOnSelect(selectedItems: Array<SelectOptionItem>, lastSelectItem: SelectOptionItem) {
  problemSelectedItems.value = selectedItems;
  problemLastSelectItem.value = lastSelectItem;
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
    const trimmedLocationInput = locationInput.value.trim();

    const problemMatch = problemSelectedItems.value.length === 0
      || problemSelectedItems.value.some(item => item.value === b.problem.label);

    const locationMatch = trimmedLocationInput === ""
      || b.team.location?.includes(locationInput.value);

    return problemMatch && locationMatch;
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
            {{ t("balloons.filter") }}
          </div>
          <div
            w-200px
          >
            <TheInput
              v-model="locationInput"
              text-align="left"
              placeholder="考场名称"
              h-37px
            />
          </div>
          <div
            w-550px
          >
            <MultiSelect
              :options="problemOptions"
              :selected-options="problemSelectedItems"
              placeholder="题目 ID"
              @select="problemOnSelect"
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
