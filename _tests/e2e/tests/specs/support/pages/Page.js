import Driver from '../utils/Driver.Extension';

export default class Page {
    open(path) {
        Driver.visit(path);
    }
}
