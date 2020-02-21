import Page from '../Page';
import Driver from '../../utils/Driver.Extension';

export class BasicPage extends Page {
    open(route) {
        super.open(`/${route}/`.toString());
    }
}
export default new BasicPage;
