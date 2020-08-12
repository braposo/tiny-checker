export class Pluggable {
    /* istanbul ignore next */
    constructor(augment: any = {}) {
        Object.assign(this, augment);
    }
    static load<T extends typeof Pluggable, U>(this: T, augment?: U) {
        return new this(augment) as InstanceType<T> & U;
    }
}
