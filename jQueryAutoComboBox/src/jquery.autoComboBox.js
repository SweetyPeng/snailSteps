(function ($) {
    $.fn.extend({
        AutoComboBox: function (options) {
            var defaultOptions = {
                width: 250,
                nameField: "name",
                valueField: "id",
                hiddenValueFieldID: "",
                dataList: [],
                selected: ""
            };
            var op = $.extend(defaultOptions, options);
            return this.each(function () {
                var g = {};
                g.$textValueField = $(this); // 指向页面上的input框
                g.textFieldID = "";          // 页面上的input框的ID
                g.$hiddenValueField = null;  // 隐藏域
                g.hiddenValueFieldID = "";   // 隐藏域的ID
                g.fuzzysearchFieldID = "";   // 模糊查询框的ID
                g.checkboxFieldID = "";      // 下拉框checkbox的ID
                g.ulFieldID = "";            // 内层ul的ID
                g.$ulField = null;           // 内层ul
                g.backfillData = "";         // 需要回填的值

                g.textFieldWidth = Number(op.width) - 20;
                g.selectFieldWidth = g.textFieldWidth - 50;
                g.fsFiledWidth = g.selectFieldWidth - 50;

                // 文本框初始化
                if (this.nodeName.toLowerCase() === "input") {
                    g.$textValueField.attr("readonly", true).width(g.textFieldWidth).addClass("l-text-field");

                    g.textFieldID = this.id;
                    g.hiddenValueFieldID = op.hiddenValueFieldID ? op.hiddenValueFieldID : g.textFieldID + "_val";
                    g.fuzzysearchFieldID = g.textFieldID + "_fs";
                    g.checkboxFieldID = g.textFieldID + "_ckx";
                    g.ulFieldID = g.textFieldID + "_ul";
                }
                if (g.$textValueField.attr("name") == undefined) {
                    g.$textValueField.attr("name", g.textFieldID);
                }

                // 隐藏域初始化
                g.$hiddenValueField = $('<input type="hidden" id="' + g.hiddenValueFieldID + '" name="' + g.hiddenValueFieldID + '"/>');

                // 初始化下拉箭头开关
                g.link = $('<div class="l-trigger"><div class="l-trigger-icon"></div></div>');

                // 初始化清空图标
                g.delete = $('<div class="l-trigger l-trigger-cancel"><div class="l-trigger-icon"></div></div>').hide();

                // 初始化模糊查询框
                g.fuzzyseachinput = $('<input type="text" id="' + g.fuzzysearchFieldID + '" class="fuzzysearchdivcus" value=""/>');
                g.fuzzyseachinput.width(g.fsFiledWidth);

                // 初始化下拉框
                g.selectBox = $('<div class="selectdivcus"></div>');
                g.selectBox.width(g.selectFieldWidth);

                // 包裹模糊搜索框和下拉框
                g.comboBox = $('<div style="display: none;"></div>');
                g.comboBox.append(g.fuzzyseachinput).append(g.selectBox);

                // 包裹外层input框以及icon等
                g.wrapper = g.$textValueField.wrap('<div class="l-text l-text-combobox" style="width:' + op.width + 'px;"></div>').parent();
                g.wrapper.append(g.delete).append(g.link);

                // 最外层添加包裹
                g.textwrapper = g.wrapper.wrap('<div></div>').parent();
                g.textwrapper.append(g.comboBox);
                g.textwrapper.append(g.$hiddenValueField);

                // 开关事件
                g.link.hover(function () {
                    g.link.addClass("l-trigger-hover");
                }, function () {
                    g.link.removeClass("l-trigger-hover");
                }).mousedown(function () {
                    g.link.addClass("l-trigger-pressed");
                }).mouseup(function () {
                    g.link.removeClass("l-trigger-pressed");
                }).click(function (e) {
                    g.comboBox.toggle();
                    e.stopPropagation();
                });

                // 输入框事件
                g.$textValueField.blur(function () {
                    g.wrapper.removeClass("l-text-focus");
                }).focus(function () {
                    g.wrapper.addClass("l-text-focus");
                }).click(function (e) {
                    g.comboBox.toggle();
                    e.stopPropagation();
                })

                // 清空图标的显示/隐藏
                g.wrapper.hover(function () {
                    g.wrapper.addClass("l-text-over");
                    g.delete.show();
                }, function () {
                    g.wrapper.removeClass("l-text-over");
                    g.delete.hide();
                });

                // 弹出框的显示/隐藏
                g.comboBox.hover(function () {
                    g.comboBox.show();
                }, function () {
                    g.comboBox.hide();
                });

                // 点击页面其他位置 隐藏弹出的页面
                $(document).click(function () {
                    g.comboBox.hide();
                });
                // 点击 弹出页面内部 阻止冒泡
                g.comboBox.filter("*").click(function (e) {
                    e.stopPropagation();
                });

                // 清除图标事件
                g.delete.hover(function () {
                    g.delete.addClass("l-trigger-hover");
                }, function () {
                    g.delete.removeClass("l-trigger-hover");
                }).click(function (e) {
                    rerender(g.$hiddenValueField.val());
                    g.$hiddenValueField.val("");
                    g.$textValueField.val("");
                    e.stopPropagation();
                });

                // 渲染
                function rerender(str) {
                    var arr = str.split(",");
                    $.each(arr, function (index) {
                        $("li input[value='" + arr[index] + "']", g.$ulField).attr("checked", false);
                    })
                }

                // 动态创建所有的checkbox元素
                g.selectBox.append('<ul id="' + g.ulFieldID + '"></ul>')
                g.$ulField = g.selectBox.find($("#" + g.ulFieldID)[0]);
                for (var i = 0; i < op.dataList.length; i++) {
                    g.$ulField.append('<li class="innerckx"><input type="checkbox" name="' + g.checkboxFieldID + '" value="' + op.dataList[i][op.valueField] + '" />' + op.dataList[i][op.nameField] + '</li>');
                }

                // 加载勾选项
                if (op.selected && op.selected.length > 0) {
                    g.backfillData = op.selected.split(",");
                } else {
                    g.backfillData = g.$hiddenValueField.val().split(",");
                }
                $.each(g.backfillData, function (index) {
                    $("li input[value='" + g.backfillData[index] + "']", g.$ulField).attr("checked", "checked");
                    var vArr = new Array();
                    $("input:checked", g.$ulField).each(function (idx) {
                        vArr[idx] = this.nextSibling.nodeValue;
                    });
                    g.$textValueField.val(vArr.join(","));
                    g.$hiddenValueField.val(g.backfillData.join(","))
                });

                // 点击复选框时，更新隐藏控件值，文本框的值
                $("input", g.$ulField).click(function () {
                    var kArr = new Array();
                    var vArr = new Array();
                    $("input:checked", g.$ulField).each(function (index) {
                        kArr[index] = $(this).val();
                        vArr[index] = this.nextSibling.nodeValue;
                    });
                    g.$hiddenValueField.val(kArr.join(","));
                    g.$textValueField.val(vArr.join(","));
                });

                // 模糊搜索框-查询
                g.fuzzyseachinput.keyup(function () {
                    var checkboxlist = document.getElementsByName(g.checkboxFieldID);
                    var fsinputVal = document.getElementById(g.fuzzysearchFieldID).value.trim();
                    for (var i = 0; i < checkboxlist.length; i++) {
                        if (checkboxlist[i].nextSibling.nodeValue.indexOf(fsinputVal) === -1) {
                            checkboxlist[i].parentNode.style.display = "none";
                        } else {
                            checkboxlist[i].parentNode.style.display = "block";
                        }
                    }
                })
            });
        }
    });
})(jQuery);
