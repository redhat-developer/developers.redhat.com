/**
 *  Plugin that implements base methods and decorates widgets.
 *  @author Radoslav Petkov
 */
'use strict';

CKEDITOR.plugins.add('basewidget', {
  requires: 'widget',
  init: pluginInit
});

function pluginInit(editor) {
  // Disables cke_reset_all styles if property `nockereset` is set to true in the dialog definition.
  CKEDITOR.on('dialogDefinition', function (e) {
    var dialog = e.data.definition.dialog;
    var dialogElement = dialog._.element;
    dialog.on('show', function () {
      if (dialog.definition.nockereset) {
        dialogElement.removeClass("cke_reset_all");
      }
    });
  });
}

/**
 * Registers widget into the editor with added extra functionality.
 * @param {Object} editor - The editor instance.
 * @param {String} name -  The name of the widget.
 * @param {Object} definition - The definition of the widget.
 */
function addWidget(editor, name, definition) {
  var functionsManager = {};
  functionsManager.init = new FunctionManager();

  var blockEvents = function () {
    var element = this.element.$;
    var blockDefaults = function (event) {
      event.stopPropagation();
    };

    element.onclick = blockDefaults;
    element.ondblclick = blockDefaults;
    element.onmousedown = blockDefaults;
    element.onmouseup = blockDefaults;
    element.onbeforecut = blockDefaults;
    element.oncut = blockDefaults;
    element.onbeforepaste = blockDefaults;
    element.onpaste = blockDefaults;
    element.oninput = blockDefaults;
    element.onkeydown = blockDefaults;
    element.onkeyup = blockDefaults;
    element.onkeypress = blockDefaults;
    element.onselectionchange = blockDefaults;
  };

  /**
   *  Implements the ability to show toolbar menu on mouseenter to widgets.
   *  @param {Object} configuration Basic configuration passed by the inherited widget.
   */
  var configToolbar = function (configuration) {

    var createToolbar = function () {
      var menu_wrapper = document.createElement('span');
      menu_wrapper.id = "configToolbar-panel";
      menu_wrapper.className = "btn-group btn-group-sm basewidget-menu-wrapper";
      menu_wrapper.style.display = "block";
      menu_wrapper.style.position = "absolute";
      menu_wrapper.style.top = "-30px";
      menu_wrapper.style.left = "20px";

      var createButton = function (definition) {
        var button = document.createElement('button');
        button.style.zIndex = "2147483647";
        button.type = "button";
        button.className = "btn btn-default";
        button.onclick = definition.onClick.bind(this);
        var icon = document.createElement('span');
        icon.className = "glyphicon" + definition.icon;
        button.appendChild(icon);
        var textNode = document.createTextNode(definition.label);
        button.appendChild(textNode);

        return button;
      }.bind(this);
      var buttons = [];
      buttons.push(createButton({
        label: 'remove',
        icon: '',
        onClick: function () {
          this.repository.del(this);
        }.bind(this)
      }));

      if (configuration) {
        if (configuration.defaultButtons) {
          // Specify the edit button functionallity
          if (configuration.defaultButtons.edit) {
            if (configuration.defaultButtons.edit.onClick) {
              buttons.push(createButton({
                label: 'edit',
                icon: 'glyphicon-edit',
                onClick: configuration.defaultButtons.edit.onClick.bind(this)
              }));
            }
          }
        } else {
          buttons = [];
        }
        if (configuration.buttons) {
          for (var i = 0; i < configuration.buttons.length; i++) {
            buttons.push(createButton.call(this, configuration.buttons[i]));
          }
        }
      }
      for (var i = 0; i < buttons.length; i++) {
        menu_wrapper.appendChild(buttons[i]);
      }

      this.wrapper.$.insertBefore(menu_wrapper, this.element.$);

    }.bind(this);

    var removeToolbar = function () {
      var toolbar = document.getElementById('configToolbar-panel');
      if (toolbar) {
        toolbar.parentNode.removeChild(toolbar);
      }
    };

    this.wrapper.$.onmouseenter = function (event) {
      var toolbar = document.getElementById('configToolbar-panel');
      if (toolbar) {
        removeToolbar();
      }
      // Because we postpone the removal of the toolbar
      // we need to be sure that we will create the new one after the delayed removal.
      setTimeout(function () {
        toolbar = document.getElementById('configToolbar-panel');
        if (toolbar) {
          removeToolbar();
        }
        createToolbar();
      }, 200);
    }.bind(this);

    this.wrapper.$.onmouseleave = function (event) {
      // Synchronize the removal of the menu with the drag handler
      setTimeout(function () {
        removeToolbar();
      }.bind(this), 170);
    }.bind(this);
  };

  /**
   *  Because of problems with calling base methods this object provides solution.
   *  Each property in this object will be added to the function manager for futher execution in the proper base function.
   */
  if (definition.extend) {
    for (var key in definition.extend) {
      if (definition.extend.hasOwnProperty(key)) {
        if (typeof(definition.extend[key]) == "function") {
          if (functionsManager.hasOwnProperty(key)) {
            functionsManager[key].addFunction(key, definition.extend[key], 1);
          } else {
            throw 'no such function ' + key;
          }
        }
      }
    }
  }

  //http://docs.ckeditor.com/#!/api/CKEDITOR.plugins.widget-event-destroy
  var onDestroy = function (callback) {
    this.on('destroy', function () {
      callback.call(this);
    }.bind(this));
  };

  functionsManager.init.addFunction('configToolbar', configToolbar, 1);
  functionsManager.init.addFunction('blockEvents', blockEvents, 1);
  functionsManager.init.addFunction('onDestroy', onDestroy, 1);


  /**
   *  Reads configuration properties and sets the proper state of the functions.
   */
  if (definition.configuration) {
    for (var key in definition.configuration) {
      if (definition.configuration.hasOwnProperty(key)) {
        if (functionsManager.hasOwnProperty(key)) {
          for (var functionName in definition.configuration[key]) {
            if (definition.configuration[key].hasOwnProperty(functionName)) {
              if (definition.configuration[key][functionName]) {
                functionsManager[key].enable(functionName);
                functionsManager[key].setFunctionConfiguration(functionName, definition.configuration[key][functionName])
              } else {
                functionsManager[key].disable(functionName);
              }
            }
          }
        } else {
          throw 'no such function ' + key;
        }
      }
    }
  }

  /**
   * Uses CKEDITOR.tools.extend to add more functionalities into the definition.
   * @link http://docs.ckeditor.com/#!/api/CKEDITOR.tools-method-extend
   */
  CKEDITOR.tools.extend(definition, {
    /**
     *  Definition overwrites {@link CKEDITOR.plugins.widget.definition#init}.
     *
     */
    init: function () {
      functionsManager.init.executeAll(this);
    }
  });
  editor.widgets.add(name, definition);
}

/**
 *  This class provides the functionality to control
 *  function executions.
 *
 *  @author Radoslav Petkov
 */
function FunctionManager() {
  this.functionsMap = {};
}

/**
 *  Adds function for control.
 *  @functionName {String} The name of the function
 *  @funct {Object function} The function.
 *  @status {bool} 1- enabled by default / 0 - disabled by default
 */
FunctionManager.prototype.addFunction = function (functionName, funct, status) {
  this.functionsMap[functionName] = {
    body: funct,
    status: status
  };
};

/**
 * Disables function.Disabled functions will not be included in the active list.
 */
FunctionManager.prototype.disable = function (functionName) {
  if (this.hasFunction(functionName)) {
    this.functionsMap[functionName].status = 0;
  }
};

/**
 * Enables function.Enabled functions will be included in the active list.
 */
FunctionManager.prototype.enable = function (functionName) {
  if (this.hasFunction(functionName)) {
    this.functionsMap[functionName].status = 1;
  }
};

FunctionManager.prototype.isEnabled = function (functionName) {
  return this.functionsMap[functionName].status == 1;
};

/**
 *  Some functions may need additional parameters passed by the extending object.
 */
FunctionManager.prototype.setFunctionConfiguration = function (functionName, configuration) {
  this.functionsMap[functionName].configuration = configuration;
};

/**
 *  Checks if such function name is presented in the manager.
 *  @return {bool} true if the manager contains it.
 *  @throws {string} exception if the manager does not contain it.
 */
FunctionManager.prototype.hasFunction = function (functionName) {
  if (this.functionsMap.hasOwnProperty(functionName)) {
    return true;
  } else {
    throw 'no such function ' + functionName;
  }
};

/**
 *  Populate an array with all enabled functions.
 *  @return {Object} The enabled array.
 */
FunctionManager.prototype.getEnabled = function () {
  var enabled = [];
  for (var functionName in this.functionsMap) {
    if (this.isEnabled(functionName)) {
      enabled.push(this.functionsMap[functionName]);
    }
  }
  return enabled;
};

/**
 *  Calls all enabled functions, but therefore binds their context to @context
 *  @param context {Object} The context.
 */
FunctionManager.prototype.executeAll = function (context) {
  var functions = this.getEnabled();
  for (var i = 0; i < functions.length; i++) {
    functions[i].body.call(context, functions[i].configuration);
  }
};

CKEDITOR.basewidget = CKEDITOR.basewidget || {};
// Adds @method addWidget to the global namespace.
CKEDITOR.tools.extend(CKEDITOR.basewidget, {
  addWidget: addWidget
});