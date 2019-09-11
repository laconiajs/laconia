import laconia from "../../src/index";

interface Dependencies {
  someKey: string;
}

interface Application {
  (input: number, dependencies: Dependencies): Promise<string>;
}

const app: Application = async (input: number, { someKey }: Dependencies) => {
  return input + someKey;
};

const adapter = (app: Application) => async (
  event: any,
  dependencies: Dependencies
) => {
  return app(event, dependencies);
};

laconia(app)
  .register(() => ({ someKey: "value" }))
  .register([() => ({ someKey: "value" }), () => ({ someKey: "value" })])
  .register(lc => {
    return { otherKey: lc.something + 1 };
  })
  .register(() => ({ someKey: "value" }), {})
  .register(() => ({ someKey: "value" }), {})
  .register(() => ({ someKey: "value" }), {
    cache: {
      enabled: false,
      maxAge: 1000
    }
  })
  .set("someKey", () => "value")
  .set("someKey", () => "value", {});

laconia(adapter(app)).register(() => ({ someKey: "value" }));
