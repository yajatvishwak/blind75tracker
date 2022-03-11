<script>
  import { darkmode } from "./darkmode";
  import { completedQuestions } from "./compeletedQuestions";
  import Card from "./components/Card.svelte";
  import JSConfetti from "js-confetti";
  const jsConfetti = new JSConfetti();
  import { onMount } from "svelte";
  let dark = $darkmode === "true" ? true : false;
  darkmode.set(dark);

  console.log($completedQuestions);
  let questionaire = [
    {
      id: 1,
      question: "this is a question1",
      questionNumber: 123,
      questionLink: "link leet code",
      videoSolution: [
        { author: "Neet Code", link: "https://youtu.be/KLlXCFG5TnA" },
        { author: "Neet Code", link: "https://youtu.be/KLlXCFG5TnA" },
      ],
      articleSolution: [],
      tags: ["tag1", "tag2"],
      completed: false,
      isOpen: true,
    },
    {
      id: 12,
      question: "this is a question1",
      questionNumber: 123,
      questionLink: "link leet code",
      videoSolution: [
        { author: "Neet Code", link: "https://youtu.be/KLlXCFG5TnA" },
        { author: "Neet Code", link: "https://youtu.be/KLlXCFG5TnA" },
      ],
      articleSolution: [],
      tags: ["tag1", "tag2"],
      completed: false,
      isOpen: true,
    },
    {
      id: 13,
      question: "this is a question1",
      questionNumber: 123,
      questionLink: "link leet code",
      videoSolution: [
        { author: "Neet Code", link: "https://youtu.be/KLlXCFG5TnA" },
        { author: "Neet Code", link: "https://youtu.be/KLlXCFG5TnA" },
      ],
      articleSolution: [],
      tags: ["tag1", "tag2"],
      completed: false,
      isOpen: true,
    },
  ];
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
      <div class="text-xl">crack your coding interviews like a boss</div>
    </div>
    <div>
      <input
        type="checkbox"
        class="toggle"
        checked={dark}
        on:change={(e) => {
          console.log(e.target.checked);
          if (e.target.checked) {
            darkmode.set(true);
          } else {
            darkmode.set(false);
          }
        }}
      />
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
        bind:completed={questions.completed}
      />
    {/each}
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
