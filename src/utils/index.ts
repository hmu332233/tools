const STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
} as const;

type StatusType = keyof typeof STATUS; // 'PENDING', 'SUCCESS', 'ERROR'

type Resource<T> = {
  get: () => T | undefined;
};

export const wrapPromise = <T>(
  promise: (...args: any[]) => Promise<T>,
  ...params: any[]
): Resource<T> => {
  let status: StatusType = STATUS.PENDING;
  let results: T | Error;

  const suspender = promise(...params)
    .then((r) => {
      status = STATUS.SUCCESS;
      results = r;
    })
    .catch((e) => {
      status = STATUS.ERROR;
      results = e;
    });

  const handlers: { [key in StatusType]: () => T | never } = {
    [STATUS.PENDING]: () => {
      throw suspender;
    },
    [STATUS.SUCCESS]: () => results as T,
    [STATUS.ERROR]: () => {
      throw results as Error;
    },
  };

  return {
    get() {
      const handler = handlers[status];
      if (!handler) {
        throw new Error('Invalid status');
      }
      return handler();
    },
  };
};

const cache = new Map();
export const loadScript = (source: string) => {
  let resource = cache.get(source);
  if (resource) return resource;

  resource = wrapPromise<string>(
    () =>
      new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = source;
        script.addEventListener('load', () => {
          resolve(source);
        });
        script.addEventListener('error', () =>
          reject(new Error(`Failed to load script ${source}`)),
        );
        document.body.appendChild(script);
      }),
  );

  cache.set(source, resource);
  return resource;
};
