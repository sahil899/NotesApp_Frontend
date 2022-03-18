
export class EnsureModuleLoadedOnceGuard {

  constructor(targetModule: any) {
    if (targetModule) {
      throw new Error(`${targetModule} is already loaded please import it only in app module`)

    }
  }

}
