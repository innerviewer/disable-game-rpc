import { Injector, webpack, Logger } from "replugged";
import { flux } from "replugged/common";

const injector = new Injector();
const logger = Logger.plugin("HideGameActivity");


export async function start(): Promise<void> {
  logger.log("Starting HideGameActivity plugin...");

  flux.Store.getAll().forEach((store) => {
    logger.log("Store found: ", store.getName())
  });

  const store = webpack.getByStoreName("RunningGameStore") as any;
  if (store === undefined) {
    logger.error("RunningGameStore not found.");
    return;
  }

  logger.log("RunningGameStore found: ", store);
  logger.log("Currently running games: ", store.getRunningGames())

  injector.instead(store, "isDetectionEnabled", () => {
    logger.log("[HideGameActivity] Suppressed isDetectionEnabled.");
    return false;
  });

  injector.instead(store, "getRunningGames", () => {
    logger.log("[HideGameActivity] Suppressed getRunningGames.");
    return [];
  });

  injector.instead(store, "getVisibleRunningGames", () => {
    logger.log("[HideGameActivity] Suppressed getVisibleRunningGames.");
    return [];
  });

  injector.instead(store, "getVisibleGame", () => {
    logger.log("[HideGameActivity] Suppressed getVisibleGame.");
    return undefined;
  });


  const gamestore = webpack.getByStoreName("GameStore") as any;
  logger.log("GameStore found: ", gamestore);

  logger.log()
  //injector.instead(gamestore, "")
}

export function stop(): void {
}

