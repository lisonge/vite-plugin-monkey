import type { WorkerBuildGraph } from './build.ts';

export interface WorkerFile {
  source?: string;
  resource?: string;
}
export interface WorkerDefinition {
  entry: string;
  modules: Record<string, WorkerFile>;
  assets: Record<string, WorkerFile & { mime: string }>;
}
interface EncodedGraph extends Omit<WorkerBuildGraph, 'assets'> {
  assets: Record<string, { source: string; mime: string }>;
}
const graphPattern = /__MONKEY_WORKER_GRAPH__([A-Za-z0-9+/=]+)__END__/;
export const workerRuntimeId = 'virtual:monkey-worker-runtime';
export const workerUrlMarker = (name: string) =>
  `__MONKEY_WORKER_URL__${Buffer.from(name).toString('hex')}__END__`;

export function encodeWorkerGraph(graph: WorkerBuildGraph): string {
  const encoded: EncodedGraph = {
    ...graph,
    assets: Object.fromEntries(
      Object.entries(graph.assets).map(([name, file]) => [
        name,
        { ...file, source: Buffer.from(file.source).toString('base64') },
      ]),
    ),
  };
  return `/*__MONKEY_WORKER_GRAPH__${Buffer.from(JSON.stringify(encoded)).toString('base64')}__END__*/`;
}
export function getWorkerGraphMarker(code: string): string | undefined {
  const match = code.match(graphPattern);
  return match ? `/*${match[0]}*/` : undefined;
}
export function hasWorkerGraph(code: string): boolean {
  return graphPattern.test(code);
}
export function decodeWorkerGraph(code: string): WorkerBuildGraph | undefined {
  const match = code.match(graphPattern);
  if (!match) return;
  const encoded = JSON.parse(
    Buffer.from(match[1], 'base64').toString(),
  ) as EncodedGraph;
  return {
    ...encoded,
    assets: Object.fromEntries(
      Object.entries(encoded.assets).map(([name, file]) => [
        name,
        { ...file, source: Buffer.from(file.source, 'base64') },
      ]),
    ),
  };
}
export function getWorkerUrl(code: string): string | undefined {
  const match = code.match(/__MONKEY_WORKER_URL__([a-f0-9]+)__END__/);
  return match ? Buffer.from(match[1], 'hex').toString() : undefined;
}
