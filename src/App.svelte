<script>
  import { darkmode } from "./darkmode";
  import { completedQuestions } from "./compeletedQuestions";
  import Card from "./components/Card.svelte";
  import * as questionaire1 from "./questionaire.json";
  import JSConfetti from "js-confetti";
  const jsConfetti = new JSConfetti();
  import { onMount } from "svelte";
  let dark = $darkmode === "true" ? true : false;
  darkmode.set(dark);

  //console.log(questionaire1);
  let questionaire = questionaire1.default;
  let mounted = 0;
  onMount(() => {
    questionaire = questionaire.map((item) => {
      if ($completedQuestions.includes(item.id)) {
        return { ...item, completed: true };
      }
      return item;
    });
    mounted = 1;
  });

  $: update(questionaire);
  $: {
    let completedall = true;
    for (const item of questionaire) {
      if (item.completed === false) {
        completedall = false;
      }
    }
    if (completedall) {
      jsConfetti.addConfetti();
    }
  }

  function update(questionaire) {
    let selected = questionaire
      .filter((item) => {
        if (item.completed) return item;
      })
      .map((item) => {
        return item.id;
      });
    if (mounted === 2) {
      completedQuestions.set(selected);
    }
    mounted = 2;
  }
</script>

<section class="p-10 mx-auto max-w-screen-lg   dark:text-indigo-50">
  <div class="my-10 flex w-full justify-between">
    <div>
      <div class="text-4xl font-bold">Blind 75</div>
      <div class="text-xl opacity-50">
        crack your coding interview like a boss
      </div>
    </div>
    <div class="flex gap-5">
      <input
        type="checkbox"
        class="toggle"
        checked={dark}
        on:change={(e) => {
          //console.log(e.target.checked);
          if (e.target.checked) {
            darkmode.set(true);
          } else {
            darkmode.set(false);
          }
        }}
      />
      <a href="https://github.com/yajatvishwak/blind75tracker" target="_blank">
        <div class="dark:hidden">
          <svg
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="30px"
            height="30px"
          >
            <path
              d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"
            /></svg
          >
        </div>
        <div class="hidden dark:block">
          <svg
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="30px"
            height="30px"
          >
            <path
              d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"
            /></svg
          >
        </div>
      </a>
    </div>
  </div>

  <div class="grid gap-5 overflow-auto">
    {#each questionaire as questions}
      <Card
        bind:isOpen={questions.isOpen}
        questionLink={questions.questionLink}
        articleSolution={questions.articleSolution}
        videoSolution={questions.videoSolution}
        question={questions.question}
        questionNumber={questions.questionNumber}
        tags={questions.tags}
        notes={questions.notes}
        bind:completed={questions.completed}
      />
    {/each}
  </div>
  <div class="text-center mt-10 opacity-50">
    for issues, addition or modification of question, raise an issue on github
  </div>
</section>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  @import url("https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap");
  body {
    font-family: "Anonymous Pro", monospace;
    @apply dark:bg-slate-800 bg-slate-200 h-full overflow-auto min-h-screen;
  }
</style>
