import React, { Component } from 'react';

/**
 * 异步加载组件（HOC）
 *
 * @export
 * @param {() => Component} importComponent 需要异步加载的组件
 * @returns 被HOC包裹的异步加载组件
 */
export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    componentDidMount() {
      this.setRenderComponent();
    }

    setRenderComponent() {
      importComponent()
        .then(({ default: component }) => {
          this.setState({
            component,
          });
        })
        .catch((err) => {
          console.error(err); // eslint-disable-line no-console
          this.setState({
            component: null,
          });
        });
    }

    render() {
      const { component: C } = this.state;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
