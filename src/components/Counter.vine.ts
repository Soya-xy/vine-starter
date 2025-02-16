interface CounterProps {
  step?: number
}

export function Counter({ step = 3 }: CounterProps) {
  const counter = ref({
    count: 0,
    add: () => {
      counter.value.count += step
    },
    decrement: () => {
      counter.value.count -= step
    },
  })
  vineStyle.scoped(`
    .action-btn {
      padding: .413rem 1rem;
      border: 1px solid #88888850;
      background-color: transparent;
      user-select: none;
      cursor: pointer;
    }
  `)

  return vine`
    <div class="counter h-full flex flex-col justify-center items-center mb-4">
      <p class="title text-lg mb-4">Count: {{ counter.count }}</p>
      <p class="title text-lg mb-4">Step: {{ step }}</p>

      <div class="actions flex gap-2">
        <button
          class="action-btn rounded-md transition-colors hover:bg-[#88888828] active:bg-[#88888850]"
          @click="counter.add"
        >
          Increment(+{{ step }})
        </button>
        <button
          class="action-btn rounded-md transition-colors hover:bg-[#88888828] active:bg-[#88888850]"
          @click="counter.decrement"
        >
          Decrement(-{{ step }})
        </button>
      </div>
    </div>
  `
}
