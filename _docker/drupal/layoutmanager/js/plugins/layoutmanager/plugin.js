/**
 *  This plugin adds various custom layouts using twitter bootstrap grid system.
 *  Author: Radoslav Petkov
 *  Modified: Jason Porter
 **/
'use strict';

CKEDITOR.plugins.add('layoutmanager', {
  requires: 'basewidget',
  icons: 'addlayout',
  lang: 'en,bg',
  init: pluginInit
});

/**
 * Config variables
 * config.layoutmanager_loadbootstrap   By default is set to false, otherwise loads the embedded bootstrap style.
 * config.layoutmanager_allowedContent  By default is set to allow all tags.
 * config.layoutmanager_buttonBoxWidth  The width of each layout-preview button in the dialog.
 * config.layoutmanager_removeLayoutMsg The message displayed on the window for confirmation of the remove layout operation.
 */
function pluginInit(editor) {
  if (typeof editor.config.contentsCss == 'object') {
    editor.config.contentsCss.push(CKEDITOR.getUrl(this.path + 'css/style.css'));
  } else {
    editor.config.contentsCss = [CKEDITOR.getUrl(this.path + 'css/style.css')];
  }

  var layoutManager = new LayoutManager(editor);
  layoutManager.generateWidgets();

  //Creates local namespace for the plugin to share data.
  editor.layoutmanager = {};

  var allowedContent;
  if (editor.config.layoutmanager_allowedContent) {
    allowedContent = editor.config.layoutmanager_allowedContent();
  } else {
    allowedContent = 'p a div span h2 h3 h4 h5 h6 section article iframe object embed strong b i em cite pre blockquote small sub sup code ul ol li dl dt dd table thead tbody th tr td img caption mediawrapper br[href,src,target,width,height,colspan,span,alt,name,title,class,id,data-options]{text-align,float,margin}(*)';
  }
  layoutManager.setAllowedContent(allowedContent);

  var addLayoutDialog = layoutManager.addLayoutDialog.bind(layoutManager);
  var manageLayoutDialog = layoutManager.manageLayoutDialog.bind(layoutManager);

  CKEDITOR.dialog.add('addLayoutDialog' + editor.name, addLayoutDialog);
  CKEDITOR.dialog.add('manageLayoutDialog' + editor.name, manageLayoutDialog);

  editor.addCommand('addlayout', {
    exec: function (editor) {
      editor.openDialog('addLayoutDialog' + editor.name);
    }
  });

  editor.addCommand('managelayout', {
    exec: function (editor, data) {
      editor.openDialog('manageLayoutDialog' + editor.name);
    }
  });

  editor.ui.addButton('AddLayout', {
    title: editor.lang.layoutmanager.title,
    command: 'addlayout'
  });
}

/**
 *  LayoutManager class implementing all layout functionalities.
 *  Author: Radoslav Petkov
 *
 *  Variables stored into the editor's object:
 *  {ckeditor.dom.element} editor.layoutmanager.selectedLayout.wrappet The selected widget wrapper element.
 *  {ckeditor.dom.element} editor.layoutmanager.selectedLayout.widget The selected widget instance.
 */
function LayoutManager(editor) {
  this.editor = editor;
  this.layoutBuilder = new LayoutBuilder();
  if (!editor.config.layoutmanager_buildDefaultLayouts) {
    this.layoutBuilder.buildDefaultLayouts();
  }
}

LayoutManager.prototype.setAllowedContent = function (allowedContent) {
  this.allowedContent = allowedContent;
};

/**
 *  The button's view should be small representation of the actual layout.
 *  In order to accomplish it ckeditor's styles should be overrided by adding hardcoded styles to the elements
 *  such as width,height,border and position.
 *
 *  @param {integer} columns The count of the columns.
 *  @param {integer array}  columnsSizes Holds the size of each column in ratio columnsSizes[i] : 12.
 */
LayoutManager.prototype.createButtonView = function (columns, columnsSizes) {
  var colWidth = [];
  var boxWidth = 58;
  if (this.editor.config.layoutmanager_buttonBoxWidth) {
    boxWidth = editor.config.layoutmanager_buttonBoxWidth;
  }
  var seedWidth = ((boxWidth - 1) / 24); // Substracts two pixels for the left and right border
  for (var i = 1; i <= 24; i++) {
    colWidth[i] = (seedWidth * i);
  }
  var html = '<div class="container-fluid">';
  for (var i = 0; i < columns; i++) {
    // If the column is not in the beginning set the border-left to 0.
    // The height of the button is set on 30px.
    html = html.concat('<div style="cursor:pointer;border:1px solid #778899;float:left;position:relative;background:#B0C4DE;text-align:center;height:30px;line-height: 30px;width:' + (colWidth[columnsSizes[i]] - 1) + 'px;' + ((i != 0) ? 'border-left:none' : '') + ' "> ' + '</div>');
  }
  html = html.concat('</div>');
  return {
    html: html,
    width: boxWidth
  }
};

LayoutManager.prototype.createButton = function (type, action) {
  var cols = type.split("/");
  var button = this.createButtonView(cols.length, cols);
  return {
    type: 'html',
    id: type,
    html: button.html,
    className: " ",
    style: 'width:' + button.width + 'px;',
    onClick: function (evt) {
      action(type);
      this._.dialog.hide();
    }
  };
};

/**
 *  Create button for each layout
 */
LayoutManager.prototype.generateButtonObjects = function (action) {
  var layouts = this.layoutBuilder.getLayouts();
  var rows = {};
  for (var type in layouts) {
    if (layouts.hasOwnProperty(type)) {
      var button = this.createButton(type, action);
      if (!rows.hasOwnProperty(layouts[type].rowPosition)) {
        rows[layouts[type].rowPosition] = [];
      }
      rows[layouts[type].rowPosition].push(button);
    }
  }
  return rows;
};

LayoutManager.prototype.createDialogDefinition = function (title, minWidth, minHeight, buttonsObjects) {
  var elementsRows = [];
  for (var row in buttonsObjects) {
    if (buttonsObjects.hasOwnProperty(row)) {
      elementsRows.push({
        type: 'hbox',
        id: ('row' + row),
        children: buttonsObjects[row]
      });
    }
  }
  return {
    title: title,
    minWidth: minWidth,
    minHeight: minHeight,
    resizable: CKEDITOR.DIALOG_RESIZE_NONE,
    buttons: [CKEDITOR.dialog.cancelButton],
    contents: [{
      elements: elementsRows
    }]
  };
};

LayoutManager.prototype.insertLayoutAction = function (name) {
  this.editor.execCommand(name);
};

LayoutManager.prototype.addLayoutDialog = function () {
  var width = 200;
  var height = 100;
  var layouts = this.generateButtonObjects(this.insertLayoutAction.bind(this));

  return this.createDialogDefinition(this.editor.lang.layoutmanager.addLayoutDialogTitle, width, height, layouts);
};

LayoutManager.prototype.changeLayoutAction = function (newLayoutName) {
  var selectedWidget = this.editor.layoutmanager.selectedWidget;
  selectedWidget.name = newLayoutName;

  var currentlySelectedLayoutWidgetElement = selectedWidget.element;
  var row = currentlySelectedLayoutWidgetElement.getChildren().getItem(0).getChildren().getItem(0);
  var columns = row.getChildren();
  var columnsCount = columns.count();

  var newColumns = newLayoutName.split('/')
  var newColumnsCount = newColumns.length;

  var attributeTemplate = [];
  attributeTemplate.push('small-{size}');
  attributeTemplate.push('medium-{size}');
  attributeTemplate.push('large-{size}');
  var pattern = /(small|medium|large)-/;

  if (newColumnsCount <= columnsCount) {
    for (var i = 0; i < newColumnsCount; i++) {
      var currentColumn = columns.getItem(i);
      var attributeString = currentColumn.getAttribute('class');
      var attributes = attributeString.split(' ');
      for (var j = 0; j < attributes.length; j++) {
        if (pattern.test(attributes[j])) {
          currentColumn.removeClass(attributes[j]);
        }
      }
      for (var j = 0; j < attributeTemplate.length; j++) {
        currentColumn.addClass(attributeTemplate[j].replace('{size}', newColumns[i]));
      }
    }
    for (var i = columnsCount - 1; i >= newColumnsCount; i--) {
      var lastColumn = columns.getItem(i);
      var penult = columns.getItem(i - 1);
      lastColumn.getChildren().getItem(0).moveChildren(penult.getChildren().getItem(0));
      lastColumn.remove();
    }
  } else {
    for (var i = 0; i < columnsCount; i++) {
      var currentColumn = columns.getItem(i);
      var attributeString = currentColumn.getAttribute('class');
      var attributes = attributeString.split(' ');
      for (var j = 0; j < attributes.length; j++) {
        if (pattern.test(attributes[j])) {
          currentColumn.removeClass(attributes[j]);
        }
      }
      for (var j = 0; j < attributeTemplate.length; j++) {
        currentColumn.addClass(attributeTemplate[j].replace('{size}', newColumns[i]));
      }
    }
    for (var i = columnsCount; i < newColumnsCount; i++) {
      var insertedCol = new CKEDITOR.dom.element('div');
      insertedCol.addClass('layout-column');
      for (var j = 0; j < attributeTemplate.length; j++) {
        insertedCol.addClass(attributeTemplate[j].replace('{size}', newColumns[i]));
      }
      // Generate unique id for the editable
      // Due to this issue http://dev.ckeditor.com/ticket/12524
      var uniqueId = new Date().getTime() + Math.floor((Math.random() * 100 ) + 1);
      var insertedColEditable = new CKEDITOR.dom.element('div');
      insertedColEditable.addClass('columnEditable' + uniqueId);
      insertedColEditable.addClass('layout-column-editable');
      insertedCol.append(insertedColEditable);
      row.append(insertedCol);
      selectedWidget.initEditable(uniqueId, {
        selector: '.columnEditable' + uniqueId
      });
    }
  }
};

LayoutManager.prototype.manageLayoutDialog = function () {
  var width = 200;
  var height = 100;
  var layouts = this.generateButtonObjects(this.changeLayoutAction.bind(this));
  return this.createDialogDefinition(this.editor.lang.layoutmanager.manageLayoutDialogTitle, width, height, layouts);
};

LayoutManager.prototype.createWidget = function (name, definition) {
  CKEDITOR.basewidget.addWidget(this.editor, name, definition);
};

LayoutManager.prototype.createWidgetDefinition = function (_template, _editables, _upcast, _allowedContent) {
  return {
    template: _template,
    extend: {
      init: function () {

      }
    },
    configuration: {
      init: {
        blockEvents: false,
        configToolbar: {
          defaultButtons: {
            edit: {
              onClick: function () {
                this.editor.layoutmanager.selectedWidget = this;

                this.editor.execCommand('managelayout', this);
              }
            }
          }
        },
        onDestroy: function () {

        }
      }
    },
    editables: _editables,
    upcast: _upcast,
    allowedContent: _allowedContent
  };
};

LayoutManager.prototype.generateWidgets = function () {
  var layouts = this.layoutBuilder.getLayouts();
  this.editables = {
    layoutColumn1: {
      selector: '.layout-column-one',
      allowedContent: this.allowedContent
    },
    layoutColumn2: {
      selector: '.layout-column-two',
      allowedContent: this.allowedContent
    },
    layoutColumn3: {
      selector: '.layout-column-three',
      allowedContent: this.allowedContent
    }
  };
  var upcast = function (element) {
    return (element.name === 'div' && element.hasClass('layout-container'));
  };

  for (var type in layouts) {
    if (layouts.hasOwnProperty(type)) {
      var widgetDefinition = this.createWidgetDefinition(layouts[type].template, this.editables, upcast, this.allowedContent);
      this.createWidget(type, widgetDefinition);
    }
  }
};

LayoutManager.prototype.removeLayoutWidget = function () {
  this.editor.layoutmanager.selectedLayout.widget.repository.del(this.editor.layoutmanager.selectedLayout.widget);
};

/**
 *  Class that builds the default templates of the layouts. It is also used to hold all available
 *  layout templates and provide them for use in the widget creation.
 */
function LayoutBuilder() {
  var defaultLayoutTemplates = [];
  defaultLayoutTemplates.push(new CKEDITOR.template('<div class="layout-container">'+
      '<div class="row" >'+
          '<div class="small-{size1} medium-{size1} large-{size1} columns">'+
              '<div class="layout-column-one layout-column-editable"><p>Column One</p></div>'+
          '</div>'+
      '</div>'+
    '</div>'));
  defaultLayoutTemplates.push(new CKEDITOR.template('<div class="layout-container">'+
      '<div class="row">'+
        '<div class="small-{size1} medium-{size1} large-{size1} columns">'+
          '<div class="layout-column-one layout-column-editable"><p>Column One</p></div>'+
        '</div>'+
        '<div class="small-{size2} medium-{size2} large-{size2} columns">'+
          '<div class="layout-column-two layout-column-editable"><p>Column Two</p></div>'+
        '</div>'+
      '</div>'+
    '</div>'));
  defaultLayoutTemplates.push(new CKEDITOR.template('<div class="layout-container">'+
      '<div class="row">'+
        '<div class="small-{size1} medium-{size1} large-{size1} columns">'+
          '<div class="layout-column-one layout-column-editable"><p>Column One</p></div>'+
        '</div>'+
        '<div class="small-{size2} medium-{size2} large-{size2} columns layout-column">'+
          '<div class="layout-column-two layout-column-editable"><p>Column Two</p></div>'+
        '</div>'+
        '<div class="small-{size3} medium-{size3} large-{size3} columns layout-column">'+
          '<div class="layout-column-three layout-column-editable"><p>Column Three</p></div>'+
        '</div>'+
      '</div>'+
    '</div>'));

  var defaultLayoutTypes = [];
  defaultLayoutTypes.push("24");
  defaultLayoutTypes.push("12/12");
  defaultLayoutTypes.push("18/6");
  defaultLayoutTypes.push("6/18");
  defaultLayoutTypes.push("16/8");
  defaultLayoutTypes.push("8/16");
  defaultLayoutTypes.push("14/10");
  defaultLayoutTypes.push("10/14");
  defaultLayoutTypes.push("8/8/8");
  defaultLayoutTypes.push("12/6/6");
  defaultLayoutTypes.push("6/12/6");
  defaultLayoutTypes.push("6/6/12");

  var layouts = {};

  var trim = function (str) {
    // removes newline / carriage return
    str = str.replace(/\n/g, "");
    // removes whitespace (space and tabs) before tags
    str = str.replace(/[\t ]+\</g, "<");
    // removes whitespace between tags
    str = str.replace(/\>[\t ]+\</g, "><");
    // removes whitespace after tags
    str = str.replace(/\>[\t ]+$/g, ">");
    return str;
  };

  /**
   *  Injects columns sizes taken from the type of the layout.
   *  @param {CKEDITOR.template} template - The template that will be injected with values.
   */
  var getTemplateWithValue = function (template, type) {
    var cols = type.split("/");
    var injectTemplate = {};

    for (var i = 0; i < cols.length; i++) {
      injectTemplate["size" + (i + 1)] = cols[i];
    }
    return trim(template.output(injectTemplate));
  };

  var addLayout = function (template, type, buttonRowPosition) {
    layouts[type] = {
      template: getTemplateWithValue(template, type),
      rowPosition: buttonRowPosition
    };
  };

  this.addLayout = function (type, buttonRowPosition) {
    var columnCount = type.split('/').length;
    addLayout(defaultLayoutTemplates[columnCount - 1], type, buttonRowPosition);
  };

  this.buildDefaultLayouts = function () {
    var row = 0;
    for (var i = 0; i < defaultLayoutTypes.length; i++) {
      // This count to which row in the choose dialog should the layout button be added
      if (i % 4 == 0) {
        row += 1;
      }
      var columnCount = defaultLayoutTypes[i].split('/').length;
      addLayout(defaultLayoutTemplates[columnCount - 1], defaultLayoutTypes[i], row);
    }
  };

  this.getLayout = function (type) {
    return layouts[type];
  };

  this.getLayouts = function () {
    return layouts;
  };
}