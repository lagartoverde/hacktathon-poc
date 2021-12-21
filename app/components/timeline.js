import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class TimelineComponent extends Component {
  @service shoppingCart;
  constructor() {
    super(...arguments);
    this.calculateSteps();
  }
  calculateSteps() {
    const items = this.shoppingCart.cart;
    let run = true;
    while (run) {
      let changed = 0;
      for (let item of items) {
        if (item.startDate) continue;
        if (!item.depends || !item.depends.length) {
          item.startDate = new Date();
          item.startDateString = this.getDateString(item.startDate);
          changed++;
        } else {
          const dependsPopulated = item.depends
            .map((id) => items.find((item) => item.id === id))
            .filter((dependency) => dependency);
          if (!dependsPopulated.length) {
            item.startDate = new Date();
            item.startDateString = this.getDateString(item.startDate);
            changed++;
            continue;
          }
          let areDependenciesScheduled = true;
          for (let dependency of dependsPopulated) {
            if (!dependency.startDate) {
              areDependenciesScheduled = false;
            }
          }
          if (areDependenciesScheduled) {
            console.log(dependsPopulated);
            const blockingDependency = dependsPopulated.reduce((a, b) => {
              const finishDateA = this.addDaysToDate(a.startDate, a.takes);
              const finishDateB = this.addDaysToDate(b.startDate, b.takes);
              return finishDateA > finishDateB ? a : b;
            }, dependsPopulated[0]);
            const earliestStartDate = this.addDaysToDate(
              blockingDependency.startDate,
              blockingDependency.takes
            );
            item.startDate = earliestStartDate;
            item.startDateString = this.getDateString(item.startDate);
            changed++;
          }
        }
      }
      if (!changed) {
        run = false;
      }
    }
    this.steps = items.sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
  }
  addDaysToDate(date, days) {
    const newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }
  getDateString(date) {
    return date.toLocaleString('nl-BE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }
}
