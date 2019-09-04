'use babel';

import AtomSplintciView from './atom-splintci-view';
import { CompositeDisposable } from 'atom';

export default {

  atomSplintciView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomSplintciView = new AtomSplintciView(state.atomSplintciViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomSplintciView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-splintci:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomSplintciView.destroy();
  },

  serialize() {
    return {
      atomSplintciViewState: this.atomSplintciView.serialize()
    };
  },

  toggle() {
    console.log('AtomSplintci was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
