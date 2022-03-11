<script>
  export let isOpen = true;
  export let completed = false;
  export let question = "";
  export let videoSolution = [];
  export let articleSolution = [];
  export let questionLink = "";
  export let tags = [];
  export let questionNumber = "";
</script>

<div
  class="w-full dark:hover:bg-slate-700 p-5 h-fit hover:bg-slate-300 hover:border-slate-400 border flex flex-col border-slate-900 dark:border-slate-600"
>
  <div
    class="flex justify-between p-1 font-bold cursor-pointer dark:hover:text-indigo-400"
  >
    <div class="flex gap-3 items-center">
      <input
        type="checkbox"
        bind:checked={completed}
        class="checkbox rounded-none dark:border-slate-600"
      />

      <div
        on:click={() => (isOpen = !isOpen)}
        class={`${completed ? "line-through" : ""}`}
      >
        {question}
      </div>
    </div>
    {#if isOpen}
      <svg
        on:click={() => (isOpen = !isOpen)}
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5 15l7-7 7 7"
        />
      </svg>
    {:else}
      <svg
        on:click={() => (isOpen = !isOpen)}
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    {/if}
  </div>
  {#if isOpen}
    <div class="mt-5 flex flex-col gap-1">
      <div class="flex gap-2">
        {#each tags as tag}
          <div class="badge dark:bg-slate-600">{tag}</div>
        {/each}
      </div>
      <div class="mt-3 flex gap-2">
        <div class="font-bold mb-1">Question number</div>
        <div class="underline">{questionNumber}</div>
      </div>
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, atque!
        Sunt consequatur eligendi doloremque enim quisquam ipsum earum nihil
        deserunt libero quis dolores assumenda perspiciatis, iure alias hic
        facilis doloribus.
      </div>
      <div class="mt-3 flex flex-col">
        <div class="font-bold mb-1">Question Link</div>
        <a href={questionLink} class="underline">{questionLink}</a>
      </div>
      <div class="mt-3 flex flex-col">
        <div class="font-bold mb-1">Video Solution</div>
        {#each videoSolution as { author, link }}
          <a href={link} class="underline">{author} - {link}</a>
        {/each}
      </div>
      <div class="mt-3 flex flex-col">
        <div class="font-bold mb-1">Article Solution</div>
        {#if articleSolution.length === 0}
          nil
        {/if}
        {#each articleSolution as { author, link }}
          <a href={link} class="underline">{author} - {link}</a>
        {/each}
      </div>
    </div>
  {/if}
</div>
