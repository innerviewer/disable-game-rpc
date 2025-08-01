import { Injector, webpack, Logger } from "replugged";

const injector = new Injector();
const logger = Logger.plugin("HideGameActivity");

export async function start(): Promise<void> {
  logger.log("Starting HideGameActivity plugin...");

  const store = webpack.getByStoreName("RunningGameStore") as any;
  if (store === undefined) {
    logger.error("RunningGameStore not found.");
    return;
  }

  //logger.log("RunningGameStore found: ", store);
  //logger.log("Currently running games: ", store.getRunningGames())

  injector.instead(store, "isDetectionEnabled", () => {
    logger.log("Suppressed isDetectionEnabled.");
    return false;
  });

  injector.instead(store, "getRunningGames", () => {
    logger.log("Suppressed getRunningGames.");
    return [];
  });

  injector.instead(store, "getVisibleRunningGames", () => {
    logger.log("Suppressed getVisibleRunningGames.");
    return [];
  });

  injector.instead(store, "getVisibleGame", () => {
    logger.log("Suppressed getVisibleGame.");
    return undefined;
  });

  logger.log("HideGameActivity plugin started successfully.");
}

export function stop(): void {
  injector.uninjectAll();
}

