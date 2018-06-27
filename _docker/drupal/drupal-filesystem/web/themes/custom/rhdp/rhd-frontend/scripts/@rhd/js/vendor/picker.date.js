/*!
 * Date picker for pickadate.js v3.4.0
 * http://amsul.github.io/pickadate.js/date.htm
 */
(function (Picker, $) {
    var DAYS_IN_WEEK = 7, WEEKS_IN_CALENDAR = 6, _ = Picker._;
    function DatePicker(picker, settings) {
        var calendar = this, elementValue = picker.$node[0].value, elementDataValue = picker.$node.data('value'), valueString = elementDataValue || elementValue, formatString = elementDataValue ? settings.formatSubmit : settings.format, isRTL = function () {
            return getComputedStyle(picker.$root[0]).direction === 'rtl';
        };
        calendar.settings = settings;
        calendar.$node = picker.$node;
        calendar.queue = {
            min: 'measure create',
            max: 'measure create',
            now: 'now create',
            select: 'parse create validate',
            highlight: 'parse navigate create validate',
            view: 'parse create validate viewset',
            disable: 'deactivate',
            enable: 'activate'
        };
        calendar.item = {};
        calendar.item.disable = (settings.disable || []).slice(0);
        calendar.item.enable = -(function (collectionDisabled) {
            return collectionDisabled[0] === true ? collectionDisabled.shift() : -1;
        })(calendar.item.disable);
        calendar.
            set('min', settings.min).
            set('max', settings.max).
            set('now');
        if (valueString) {
            calendar.set('select', valueString, {
                format: formatString,
                fromValue: !!elementValue
            });
        }
        else {
            calendar.
                set('select', null).
                set('highlight', calendar.item.now);
        }
        calendar.key = {
            40: 7,
            38: -7,
            39: function () { return isRTL() ? -1 : 1; },
            37: function () { return isRTL() ? 1 : -1; },
            go: function (timeChange) {
                var highlightedObject = calendar.item.highlight, targetDate = new Date(highlightedObject.year, highlightedObject.month, highlightedObject.date + timeChange);
                calendar.set('highlight', [targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()], { interval: timeChange });
                this.render();
            }
        };
        picker.
            on('render', function () {
            picker.$root.find('.' + settings.klass.selectMonth).on('change', function () {
                var value = this.value;
                if (value) {
                    picker.set('highlight', [picker.get('view').year, value, picker.get('highlight').date]);
                    picker.$root.find('.' + settings.klass.selectMonth).trigger('focus');
                }
            });
            picker.$root.find('.' + settings.klass.selectYear).on('change', function () {
                var value = this.value;
                if (value) {
                    picker.set('highlight', [value, picker.get('view').month, picker.get('highlight').date]);
                    picker.$root.find('.' + settings.klass.selectYear).trigger('focus');
                }
            });
        }).
            on('open', function () {
            picker.$root.find('button, select').attr('disabled', false);
        }).
            on('close', function () {
            picker.$root.find('button, select').attr('disabled', true);
        });
    }
    DatePicker.prototype.set = function (type, value, options) {
        var calendar = this, calendarItem = calendar.item;
        if (value === null) {
            calendarItem[type] = value;
            return calendar;
        }
        calendarItem[(type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type)] = calendar.queue[type].split(' ').map(function (method) {
            value = calendar[method](type, value, options);
            return value;
        }).pop();
        if (type == 'select') {
            calendar.set('highlight', calendarItem.select, options);
        }
        else if (type == 'highlight') {
            calendar.set('view', calendarItem.highlight, options);
        }
        else if (type.match(/^(flip|min|max|disable|enable)$/)) {
            if (calendarItem.select && calendar.disabled(calendarItem.select)) {
                calendar.set('select', calendarItem.select, options);
            }
            if (calendarItem.highlight && calendar.disabled(calendarItem.highlight)) {
                calendar.set('highlight', calendarItem.highlight, options);
            }
        }
        return calendar;
    };
    DatePicker.prototype.get = function (type) {
        return this.item[type];
    };
    DatePicker.prototype.create = function (type, value, options) {
        var isInfiniteValue, calendar = this;
        value = value === undefined ? type : value;
        if (value == -Infinity || value == Infinity) {
            isInfiniteValue = value;
        }
        else if ($.isPlainObject(value) && _.isInteger(value.pick)) {
            value = value.obj;
        }
        else if ($.isArray(value)) {
            value = new Date(value[0], value[1], value[2]);
            value = _.isDate(value) ? value : calendar.create().obj;
        }
        else if (_.isInteger(value) || _.isDate(value)) {
            value = calendar.normalize(new Date(value), options);
        }
        else {
            value = calendar.now(type, value, options);
        }
        return {
            year: isInfiniteValue || value.getFullYear(),
            month: isInfiniteValue || value.getMonth(),
            date: isInfiniteValue || value.getDate(),
            day: isInfiniteValue || value.getDay(),
            obj: isInfiniteValue || value,
            pick: isInfiniteValue || value.getTime()
        };
    };
    DatePicker.prototype.createRange = function (from, to) {
        var calendar = this, createDate = function (date) {
            if (date === true || $.isArray(date) || _.isDate(date)) {
                return calendar.create(date);
            }
            return date;
        };
        if (!_.isInteger(from)) {
            from = createDate(from);
        }
        if (!_.isInteger(to)) {
            to = createDate(to);
        }
        if (_.isInteger(from) && $.isPlainObject(to)) {
            from = [to.year, to.month, to.date + from];
        }
        else if (_.isInteger(to) && $.isPlainObject(from)) {
            to = [from.year, from.month, from.date + to];
        }
        return {
            from: createDate(from),
            to: createDate(to)
        };
    };
    DatePicker.prototype.withinRange = function (range, dateUnit) {
        range = this.createRange(range.from, range.to);
        return dateUnit.pick >= range.from.pick && dateUnit.pick <= range.to.pick;
    };
    DatePicker.prototype.overlapRanges = function (one, two) {
        var calendar = this;
        one = calendar.createRange(one.from, one.to);
        two = calendar.createRange(two.from, two.to);
        return calendar.withinRange(one, two.from) || calendar.withinRange(one, two.to) ||
            calendar.withinRange(two, one.from) || calendar.withinRange(two, one.to);
    };
    DatePicker.prototype.now = function (type, value, options) {
        value = new Date();
        if (options && options.rel) {
            value.setDate(value.getDate() + options.rel);
        }
        return this.normalize(value, options);
    };
    DatePicker.prototype.navigate = function (type, value, options) {
        var targetDateObject, targetYear, targetMonth, targetDate, isTargetArray = $.isArray(value), isTargetObject = $.isPlainObject(value), viewsetObject = this.item.view;
        if (isTargetArray || isTargetObject) {
            if (isTargetObject) {
                targetYear = value.year;
                targetMonth = value.month;
                targetDate = value.date;
            }
            else {
                targetYear = +value[0];
                targetMonth = +value[1];
                targetDate = +value[2];
            }
            if (options && options.nav && viewsetObject && viewsetObject.month !== targetMonth) {
                targetYear = viewsetObject.year;
                targetMonth = viewsetObject.month;
            }
            targetDateObject = new Date(targetYear, targetMonth + (options && options.nav ? options.nav : 0), 1);
            targetYear = targetDateObject.getFullYear();
            targetMonth = targetDateObject.getMonth();
            while (new Date(targetYear, targetMonth, targetDate).getMonth() !== targetMonth) {
                targetDate -= 1;
            }
            value = [targetYear, targetMonth, targetDate];
        }
        return value;
    };
    DatePicker.prototype.normalize = function (value) {
        value.setHours(0, 0, 0, 0);
        return value;
    };
    DatePicker.prototype.measure = function (type, value) {
        var calendar = this;
        if (!value) {
            value = type == 'min' ? -Infinity : Infinity;
        }
        else if (_.isInteger(value)) {
            value = calendar.now(type, value, { rel: value });
        }
        return value;
    };
    DatePicker.prototype.viewset = function (type, dateObject) {
        return this.create([dateObject.year, dateObject.month, 1]);
    };
    DatePicker.prototype.validate = function (type, dateObject, options) {
        var calendar = this, originalDateObject = dateObject, interval = options && options.interval ? options.interval : 1, isFlippedBase = calendar.item.enable === -1, hasEnabledBeforeTarget, hasEnabledAfterTarget, minLimitObject = calendar.item.min, maxLimitObject = calendar.item.max, reachedMin, reachedMax, hasEnabledWeekdays = isFlippedBase && calendar.item.disable.filter(function (value) {
            if ($.isArray(value)) {
                var dateTime = calendar.create(value).pick;
                if (dateTime < dateObject.pick)
                    hasEnabledBeforeTarget = true;
                else if (dateTime > dateObject.pick)
                    hasEnabledAfterTarget = true;
            }
            return _.isInteger(value);
        }).length;
        if (!options || !options.nav)
            if ((!isFlippedBase && calendar.disabled(dateObject)) ||
                (isFlippedBase && calendar.disabled(dateObject) && (hasEnabledWeekdays || hasEnabledBeforeTarget || hasEnabledAfterTarget)) ||
                (!isFlippedBase && (dateObject.pick <= minLimitObject.pick || dateObject.pick >= maxLimitObject.pick))) {
                if (isFlippedBase && !hasEnabledWeekdays && ((!hasEnabledAfterTarget && interval > 0) || (!hasEnabledBeforeTarget && interval < 0))) {
                    interval *= -1;
                }
                while (calendar.disabled(dateObject)) {
                    if (Math.abs(interval) > 1 && (dateObject.month < originalDateObject.month || dateObject.month > originalDateObject.month)) {
                        dateObject = originalDateObject;
                        interval = interval > 0 ? 1 : -1;
                    }
                    if (dateObject.pick <= minLimitObject.pick) {
                        reachedMin = true;
                        interval = 1;
                        dateObject = calendar.create([minLimitObject.year, minLimitObject.month, minLimitObject.date - 1]);
                    }
                    else if (dateObject.pick >= maxLimitObject.pick) {
                        reachedMax = true;
                        interval = -1;
                        dateObject = calendar.create([maxLimitObject.year, maxLimitObject.month, maxLimitObject.date + 1]);
                    }
                    if (reachedMin && reachedMax) {
                        break;
                    }
                    dateObject = calendar.create([dateObject.year, dateObject.month, dateObject.date + interval]);
                }
            }
        return dateObject;
    };
    DatePicker.prototype.disabled = function (dateToVerify) {
        var calendar = this, isDisabledMatch = calendar.item.disable.filter(function (dateToDisable) {
            if (_.isInteger(dateToDisable)) {
                return dateToVerify.day === (calendar.settings.firstDay ? dateToDisable : dateToDisable - 1) % 7;
            }
            if ($.isArray(dateToDisable) || _.isDate(dateToDisable)) {
                return dateToVerify.pick === calendar.create(dateToDisable).pick;
            }
            if ($.isPlainObject(dateToDisable)) {
                return calendar.withinRange(dateToDisable, dateToVerify);
            }
        });
        isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function (dateToDisable) {
            return $.isArray(dateToDisable) && dateToDisable[3] == 'inverted' ||
                $.isPlainObject(dateToDisable) && dateToDisable.inverted;
        }).length;
        return calendar.item.enable === -1 ? !isDisabledMatch : isDisabledMatch ||
            dateToVerify.pick < calendar.item.min.pick ||
            dateToVerify.pick > calendar.item.max.pick;
    };
    DatePicker.prototype.parse = function (type, value, options) {
        var calendar = this, parsingObject = {}, monthIndex;
        if (!value || _.isInteger(value) || $.isArray(value) || _.isDate(value) || $.isPlainObject(value) && _.isInteger(value.pick)) {
            return value;
        }
        if (!(options && options.format)) {
            options = options || {};
            options.format = calendar.settings.format;
        }
        monthIndex = typeof value == 'string' && !options.fromValue ? 1 : 0;
        calendar.formats.toArray(options.format).map(function (label) {
            var formattingLabel = calendar.formats[label], formatLength = formattingLabel ? _.trigger(formattingLabel, calendar, [value, parsingObject]) : label.replace(/^!/, '').length;
            if (formattingLabel) {
                parsingObject[label] = value.substr(0, formatLength);
            }
            value = value.substr(formatLength);
        });
        return [
            parsingObject.yyyy || parsingObject.yy,
            +(parsingObject.mm || parsingObject.m) - monthIndex,
            parsingObject.dd || parsingObject.d
        ];
    };
    DatePicker.prototype.formats = (function () {
        function getWordLengthFromCollection(string, collection, dateObject) {
            var word = string.match(/\w+/)[0];
            if (!dateObject.mm && !dateObject.m) {
                dateObject.m = collection.indexOf(word);
            }
            return word.length;
        }
        function getFirstWordLength(string) {
            return string.match(/\w+/)[0].length;
        }
        return {
            d: function (string, dateObject) {
                return string ? _.digits(string) : dateObject.date;
            },
            dd: function (string, dateObject) {
                return string ? 2 : _.lead(dateObject.date);
            },
            ddd: function (string, dateObject) {
                return string ? getFirstWordLength(string) : this.settings.weekdaysShort[dateObject.day];
            },
            dddd: function (string, dateObject) {
                return string ? getFirstWordLength(string) : this.settings.weekdaysFull[dateObject.day];
            },
            m: function (string, dateObject) {
                return string ? _.digits(string) : dateObject.month + 1;
            },
            mm: function (string, dateObject) {
                return string ? 2 : _.lead(dateObject.month + 1);
            },
            mmm: function (string, dateObject) {
                var collection = this.settings.monthsShort;
                return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month];
            },
            mmmm: function (string, dateObject) {
                var collection = this.settings.monthsFull;
                return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month];
            },
            yy: function (string, dateObject) {
                return string ? 2 : ('' + dateObject.year).slice(2);
            },
            yyyy: function (string, dateObject) {
                return string ? 4 : dateObject.year;
            },
            toArray: function (formatString) { return formatString.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g); },
            toString: function (formatString, itemObject) {
                var calendar = this;
                return calendar.formats.toArray(formatString).map(function (label) {
                    return _.trigger(calendar.formats[label], calendar, [0, itemObject]) || label.replace(/^!/, '');
                }).join('');
            }
        };
    })();
    DatePicker.prototype.isDateExact = function (one, two) {
        var calendar = this;
        if ((_.isInteger(one) && _.isInteger(two)) ||
            (typeof one == 'boolean' && typeof two == 'boolean')) {
            return one === two;
        }
        if ((_.isDate(one) || $.isArray(one)) &&
            (_.isDate(two) || $.isArray(two))) {
            return calendar.create(one).pick === calendar.create(two).pick;
        }
        if ($.isPlainObject(one) && $.isPlainObject(two)) {
            return calendar.isDateExact(one.from, two.from) && calendar.isDateExact(one.to, two.to);
        }
        return false;
    };
    DatePicker.prototype.isDateOverlap = function (one, two) {
        var calendar = this;
        if (_.isInteger(one) && (_.isDate(two) || $.isArray(two))) {
            return one === calendar.create(two).day + 1;
        }
        if (_.isInteger(two) && (_.isDate(one) || $.isArray(one))) {
            return two === calendar.create(one).day + 1;
        }
        if ($.isPlainObject(one) && $.isPlainObject(two)) {
            return calendar.overlapRanges(one, two);
        }
        return false;
    };
    DatePicker.prototype.flipEnable = function (val) {
        var itemObject = this.item;
        itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1);
    };
    DatePicker.prototype.deactivate = function (type, datesToDisable) {
        var calendar = this, disabledItems = calendar.item.disable.slice(0);
        if (datesToDisable == 'flip') {
            calendar.flipEnable();
        }
        else if (datesToDisable === false) {
            calendar.flipEnable(1);
            disabledItems = [];
        }
        else if (datesToDisable === true) {
            calendar.flipEnable(-1);
            disabledItems = [];
        }
        else {
            datesToDisable.map(function (unitToDisable) {
                var matchFound;
                for (var index = 0; index < disabledItems.length; index += 1) {
                    if (calendar.isDateExact(unitToDisable, disabledItems[index])) {
                        matchFound = true;
                        break;
                    }
                }
                if (!matchFound) {
                    if (_.isInteger(unitToDisable) ||
                        _.isDate(unitToDisable) ||
                        $.isArray(unitToDisable) ||
                        ($.isPlainObject(unitToDisable) && unitToDisable.from && unitToDisable.to)) {
                        disabledItems.push(unitToDisable);
                    }
                }
            });
        }
        return disabledItems;
    };
    DatePicker.prototype.activate = function (type, datesToEnable) {
        var calendar = this, disabledItems = calendar.item.disable, disabledItemsCount = disabledItems.length;
        if (datesToEnable == 'flip') {
            calendar.flipEnable();
        }
        else if (datesToEnable === true) {
            calendar.flipEnable(1);
            disabledItems = [];
        }
        else if (datesToEnable === false) {
            calendar.flipEnable(-1);
            disabledItems = [];
        }
        else {
            datesToEnable.map(function (unitToEnable) {
                var matchFound, disabledUnit, index, isExactRange;
                for (index = 0; index < disabledItemsCount; index += 1) {
                    disabledUnit = disabledItems[index];
                    if (calendar.isDateExact(disabledUnit, unitToEnable)) {
                        matchFound = disabledItems[index] = null;
                        isExactRange = true;
                        break;
                    }
                    else if (calendar.isDateOverlap(disabledUnit, unitToEnable)) {
                        if ($.isPlainObject(unitToEnable)) {
                            unitToEnable.inverted = true;
                            matchFound = unitToEnable;
                        }
                        else if ($.isArray(unitToEnable)) {
                            matchFound = unitToEnable;
                            if (!matchFound[3])
                                matchFound.push('inverted');
                        }
                        else if (_.isDate(unitToEnable)) {
                            matchFound = [unitToEnable.getFullYear(), unitToEnable.getMonth(), unitToEnable.getDate(), 'inverted'];
                        }
                        break;
                    }
                }
                if (matchFound)
                    for (index = 0; index < disabledItemsCount; index += 1) {
                        if (calendar.isDateExact(disabledItems[index], unitToEnable)) {
                            disabledItems[index] = null;
                            break;
                        }
                    }
                if (isExactRange)
                    for (index = 0; index < disabledItemsCount; index += 1) {
                        if (calendar.isDateOverlap(disabledItems[index], unitToEnable)) {
                            disabledItems[index] = null;
                            break;
                        }
                    }
                if (matchFound) {
                    disabledItems.push(matchFound);
                }
            });
        }
        return disabledItems.filter(function (val) { return val != null; });
    };
    DatePicker.prototype.nodes = function (isOpen) {
        var calendar = this, settings = calendar.settings, calendarItem = calendar.item, nowObject = calendarItem.now, selectedObject = calendarItem.select, highlightedObject = calendarItem.highlight, viewsetObject = calendarItem.view, disabledCollection = calendarItem.disable, minLimitObject = calendarItem.min, maxLimitObject = calendarItem.max, tableHead = (function (collection) {
            if (settings.firstDay) {
                collection.push(collection.shift());
            }
            return _.node('thead', _.node('tr', _.group({
                min: 0,
                max: DAYS_IN_WEEK - 1,
                i: 1,
                node: 'th',
                item: function (counter) {
                    return [
                        collection[counter],
                        settings.klass.weekdays
                    ];
                }
            })));
        })((settings.showWeekdaysFull ? settings.weekdaysFull : settings.weekdaysShort).slice(0)), createMonthNav = function (next) {
            return _.node('div', ' ', settings.klass['nav' + (next ? 'Next' : 'Prev')] + ((next && viewsetObject.year >= maxLimitObject.year && viewsetObject.month >= maxLimitObject.month) ||
                (!next && viewsetObject.year <= minLimitObject.year && viewsetObject.month <= minLimitObject.month) ?
                ' ' + settings.klass.navDisabled : ''), 'data-nav=' + (next || -1));
        }, createMonthLabel = function (monthsCollection) {
            if (settings.selectMonths) {
                return _.node('select', _.group({
                    min: 0,
                    max: 11,
                    i: 1,
                    node: 'option',
                    item: function (loopedMonth) {
                        return [
                            monthsCollection[loopedMonth], 0,
                            'value=' + loopedMonth +
                                (viewsetObject.month == loopedMonth ? ' selected' : '') +
                                (((viewsetObject.year == minLimitObject.year && loopedMonth < minLimitObject.month) ||
                                    (viewsetObject.year == maxLimitObject.year && loopedMonth > maxLimitObject.month)) ?
                                    ' disabled' : '')
                        ];
                    }
                }), settings.klass.selectMonth, isOpen ? '' : 'disabled');
            }
            return _.node('div', monthsCollection[viewsetObject.month], settings.klass.month);
        }, createYearLabel = function () {
            var focusedYear = viewsetObject.year, numberYears = settings.selectYears === true ? 5 : ~~(settings.selectYears / 2);
            if (numberYears) {
                var minYear = minLimitObject.year, maxYear = maxLimitObject.year, lowestYear = focusedYear - numberYears, highestYear = focusedYear + numberYears;
                if (minYear > lowestYear) {
                    highestYear += minYear - lowestYear;
                    lowestYear = minYear;
                }
                if (maxYear < highestYear) {
                    var availableYears = lowestYear - minYear, neededYears = highestYear - maxYear;
                    lowestYear -= availableYears > neededYears ? neededYears : availableYears;
                    highestYear = maxYear;
                }
                return _.node('select', _.group({
                    min: lowestYear,
                    max: highestYear,
                    i: 1,
                    node: 'option',
                    item: function (loopedYear) {
                        return [
                            loopedYear, 0,
                            'value=' + loopedYear + (focusedYear == loopedYear ? ' selected' : '')
                        ];
                    }
                }), settings.klass.selectYear, isOpen ? '' : 'disabled');
            }
            return _.node('div', focusedYear, settings.klass.year);
        };
        return _.node('div', createMonthNav() + createMonthNav(1) +
            createMonthLabel(settings.showMonthsShort ? settings.monthsShort : settings.monthsFull) +
            createYearLabel(), settings.klass.header) + _.node('table', tableHead +
            _.node('tbody', _.group({
                min: 0,
                max: WEEKS_IN_CALENDAR - 1,
                i: 1,
                node: 'tr',
                item: function (rowCounter) {
                    var shiftDateBy = settings.firstDay && calendar.create([viewsetObject.year, viewsetObject.month, 1]).day === 0 ? -7 : 0;
                    return [
                        _.group({
                            min: DAYS_IN_WEEK * rowCounter - viewsetObject.day + shiftDateBy + 1,
                            max: function () {
                                return this.min + DAYS_IN_WEEK - 1;
                            },
                            i: 1,
                            node: 'td',
                            item: function (targetDate) {
                                targetDate = calendar.create([viewsetObject.year, viewsetObject.month, targetDate + (settings.firstDay ? 1 : 0)]);
                                var isSelected = selectedObject && selectedObject.pick == targetDate.pick, isHighlighted = highlightedObject && highlightedObject.pick == targetDate.pick, isDisabled = disabledCollection && calendar.disabled(targetDate) || targetDate.pick < minLimitObject.pick || targetDate.pick > maxLimitObject.pick;
                                return [
                                    _.node('div', targetDate.date, (function (klasses) {
                                        klasses.push(viewsetObject.month == targetDate.month ? settings.klass.infocus : settings.klass.outfocus);
                                        if (nowObject.pick == targetDate.pick) {
                                            klasses.push(settings.klass.now);
                                        }
                                        if (isSelected) {
                                            klasses.push(settings.klass.selected);
                                        }
                                        if (isHighlighted) {
                                            klasses.push(settings.klass.highlighted);
                                        }
                                        if (isDisabled) {
                                            klasses.push(settings.klass.disabled);
                                        }
                                        return klasses.join(' ');
                                    })([settings.klass.day]), 'data-pick=' + targetDate.pick + ' ' + _.ariaAttr({
                                        role: 'button',
                                        controls: calendar.$node[0].id,
                                        checked: isSelected && calendar.$node.val() === _.trigger(calendar.formats.toString, calendar, [settings.format, targetDate]) ? true : null,
                                        activedescendant: isHighlighted ? true : null,
                                        disabled: isDisabled ? true : null
                                    }))
                                ];
                            }
                        })
                    ];
                }
            })), settings.klass.table) +
            _.node('div', _.node('button', settings.today, settings.klass.buttonToday, 'type=button data-pick=' + nowObject.pick + (isOpen ? '' : ' disabled')) +
                _.node('button', settings.clear, settings.klass.buttonClear, 'type=button data-clear=1' + (isOpen ? '' : ' disabled')), settings.klass.footer);
    };
    DatePicker.defaults = (function (prefix) {
        return {
            monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            today: 'Today',
            clear: 'Clear',
            format: 'd mmmm, yyyy',
            klass: {
                table: prefix + 'table',
                header: prefix + 'header',
                navPrev: prefix + 'nav--prev',
                navNext: prefix + 'nav--next',
                navDisabled: prefix + 'nav--disabled',
                month: prefix + 'month',
                year: prefix + 'year',
                selectMonth: prefix + 'select--month',
                selectYear: prefix + 'select--year',
                weekdays: prefix + 'weekday',
                day: prefix + 'day',
                disabled: prefix + 'day--disabled',
                selected: prefix + 'day--selected',
                highlighted: prefix + 'day--highlighted',
                now: prefix + 'day--today',
                infocus: prefix + 'day--infocus',
                outfocus: prefix + 'day--outfocus',
                footer: prefix + 'footer',
                buttonClear: prefix + 'button--clear',
                buttonToday: prefix + 'button--today'
            }
        };
    })(Picker.klasses().picker + '__');
    Picker.extend('pickadate', DatePicker);
}(Picker, jQuery));
