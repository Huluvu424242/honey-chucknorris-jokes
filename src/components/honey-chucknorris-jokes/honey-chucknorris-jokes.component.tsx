import {Component, Element, h, Host, Prop, State, Watch} from "@stencil/core";
import {Subscription} from "rxjs";

@Component({
  tag: "honey-chucknorris-jokes",
  styleUrl: "honey-chucknorris-jokes.css",
  shadow: true
})
export class HoneyChucknorrisJokes {

  /**
   * Host Element
   */
  @Element() hostElement: HTMLElement;

  /**
   * ID vom Host Tag
   */
  ident: string;

  /**
   * Zeitintervall nachdem ein neuer Witz abgerufen wird (in Sekunden).
   */
  jokePeriodInSecond: number = 120;



  //
  // @Watch("newsFeed")
  // newsWatcher(newValue: HTMLHoneyNewsFeedElement, oldValue: HTMLHoneyNewsFeedElement) {
  //   oldValue = oldValue;
  //   if (newValue) {
  //     if (this.newsFeed) {
  //       this.newsFeed.feedLoader = this.feedLoader;
  //     }
  //   }
  // }


  public connectedCallback() {
    // attribute initialisieren wenn defaults notwendig
    this.ident = this.hostElement.id ? this.hostElement.id : Math.random().toString(36).substring(7);

  public disconnectedCallback() {
    this.routerSubscription.unsubscribe();
  }

  protected createNewTitleText(): string {
    // if (this.) {
    //   return this.options.disabledTitleText;
    // } else {
    return this.options.titleText;
    // }
  }

  protected getTitleText(): string {
    if (this.createTitleText) {
      return this.createNewTitleText();
    } else {
      return this.hostElement.title;
    }
  }

  protected getAriaLabel(): string {
    if (this.createAriaLabel) {
      return this.options.ariaLabel;
    } else {
      return this.hostElement.getAttribute("aria-label");
    }
  }

  protected getHostClass(): string {
    let hostClass = this.initialHostClass;
    // if (this.hasNoFeeds()) {
    //   return hostClass + " " + this.options.disabledHostClass;
    // } else {
    //   return hostClass + " " + this.options.enabledHostClass;
    // }
    return hostClass;
  }


  public render() {
    Logger.debugMessage('##RENDER##');

    return (
      <Host
        title={this.getTitleText()}
        aria-label={this.getAriaLabel()}
        // tabindex={this.hasNoFeeds() ? -1 : this.taborder}
        // class={this.getHostClass()}
        // disabled={this.hasNoFeeds()}
        class="paper"
      >

        <honey-chucknorris-jokes-header/>

        {!this.route || this.route === "/" || this.route === "/index.html" || this.route === "/news" ? <honey-chucknorris-jokes-feed ref={(el) => {
          // @ts-ignore
          this.newsFeed = el as HTMLHoneyNewsFeedElement
        }}/> : null}
        {this.route === "/feeds" ? <honey-chucknorris-jokes-feeds ref={(el) => {
          // @ts-ignore
          this.feedAdministration = el as HTMLHoneyNewsFeedsElement
        }
        }/> : null}
        {this.route === "/statistic" ? <honey-chucknorris-jokes-statistic/> : null}
        {this.route === "/about" ? <About/> : null}

      </Host>
    );
  }
}
