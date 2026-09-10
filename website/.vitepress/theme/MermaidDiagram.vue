<script lang="ts">
let diagramSequence = 0;
let mermaidPromise: Promise<typeof import('mermaid').default> | undefined;

function loadMermaid(): Promise<typeof import('mermaid').default> {
  mermaidPromise ??= import('mermaid').then(({ default: mermaid }) => mermaid);
  return mermaidPromise;
}
</script>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useData } from 'vitepress';

const props = defineProps<{
  encodedCode: string;
}>();

const source = decodeURIComponent(props.encodedCode);
const container = ref<HTMLElement | null>(null);
const renderedSvg = ref('');
const renderFailed = ref(false);
const { isDark } = useData();

let renderSequence = 0;

async function renderDiagram(): Promise<void> {
  const currentRender = ++renderSequence;

  try {
    const mermaid = await loadMermaid();
    if (currentRender !== renderSequence) return;

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: isDark.value ? 'dark' : 'default',
    });

    const id = `mermaid-diagram-${diagramSequence++}`;
    const { svg, bindFunctions } = await mermaid.render(id, source);
    if (currentRender !== renderSequence) return;

    renderFailed.value = false;
    renderedSvg.value = svg;
    await nextTick();

    if (currentRender === renderSequence && container.value !== null) {
      bindFunctions?.(container.value);
    }
  } catch (error) {
    if (currentRender !== renderSequence) return;

    renderedSvg.value = '';
    renderFailed.value = true;
    console.error('Failed to render Mermaid diagram.', error);
  }
}

watch(isDark, () => {
  void renderDiagram();
});

onMounted(() => {
  void renderDiagram();
});

onBeforeUnmount(() => {
  renderSequence += 1;
});
</script>

<template>
  <div ref="container" class="mermaid-diagram">
    <div v-if="renderedSvg" class="mermaid-diagram__svg" v-html="renderedSvg" />
    <pre
      v-else-if="renderFailed"
      class="mermaid-diagram__fallback"
    ><code>{{ source }}</code></pre>
  </div>
</template>

<style scoped>
.mermaid-diagram {
  margin: 16px 0;
  overflow-x: auto;
  text-align: center;
}

.mermaid-diagram__svg :deep(svg) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}

.mermaid-diagram__fallback {
  margin: 0;
  text-align: left;
  white-space: pre-wrap;
}
</style>
