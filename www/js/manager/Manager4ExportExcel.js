/**
 * Created by Truc on 9/15/2016.
 */
var Manager4ExportExcel = new function () {

    /**
     * create tmp table html and export this table to xls file
     * @param content
     * @param endLevel
     * @param isSkipGenerateSum
     * @param additionName
     * @param fullReplaceName
     */
    this.exportTable = function(content, endLevel, isSkipGenerateSum, additionName, fullReplaceName, isExportBKFile) {
        var newContent = [];
        if (endLevel < 1 ||
        Lobby.Utils.objectIsNull(endLevel)) {
            newContent = content.slice();
        }
        else {
            newContent = content.slice(0, endLevel + 1);
        }

        if(!isSkipGenerateSum) {
            var listRowNeedToCountSum = [];
            listRowNeedToCountSum.push(newContent[0].indexOf("Level bonus"));
            listRowNeedToCountSum.push(newContent[0].indexOf("Ach. Bonus"));
            listRowNeedToCountSum.push(newContent[0].indexOf("30-min Bonus"));
            listRowNeedToCountSum.push(newContent[0].indexOf("# of spins make"));
            listRowNeedToCountSum.push(newContent[0].indexOf("Video Bonus(30 minute between 2 videos)"));
            listRowNeedToCountSum.push(newContent[0].indexOf("Total Bet"));

            var sumRow = [];
            sumRow.push("TOTAL");
            for (var i = 1; i < newContent[newContent.length - 1].length; ++i) {
                var value = "";
                if (listRowNeedToCountSum.indexOf(i) > -1) {
                    var keyRow = Lobby.Utils.getCharRowByIndexRowInExcel(i + 1);
                    value = '=SUM(' + keyRow + '2:' + keyRow + newContent.length + ')';
                }
                sumRow.push(value);
            }

            newContent.push(sumRow);
        }

        function tableCreate() {
            var body = document.getElementById('tableTestAlgorithm');
            var tbl = document.createElement('table');
            tbl.id = "tableTmp";
            tbl.style.width = '100%';
            tbl.setAttribute('border', '1');
            var tbdy = document.createElement('tbody');
            var numberOfRow = newContent.length;
            for (var i = 0; i < numberOfRow; i++) {
                var tr = document.createElement('tr');
                var numberOfColumn = newContent[i].length;
                for (var j = 0; j < numberOfColumn; j++) {
                        var td = document.createElement('td');
                        td.appendChild(document.createTextNode(newContent[i][j]));
//                            i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                        tr.appendChild(td);
                }
                tbdy.appendChild(tr);
            }
            tbl.appendChild(tbdy);
            body.appendChild(tbl)
        }
        tableCreate();

        function fnExcelReport(isExportBKFile)
        {
            var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
            var textRange; var j=0;
            var tab = document.getElementById('tableTmp'); // id of table

            for(j = 0 ; j < tab.rows.length ; j++)
            {
                tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
                //tab_text=tab_text+"</tr>";
            }

            tab_text=tab_text+"</table>";
            tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
            tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
            tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");

            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
            {
                txtArea1.document.open("txt/html","replace");
                txtArea1.document.write(tab_text);
                txtArea1.document.close();
                txtArea1.focus();
                sa=txtArea1.document.execCommand("SaveAs",true,"SayThanksToSubmit.xls");
            }
            else                 //other browser not tested on IE 11
            {
                var uri = 'data:application/vnd.ms-excel,' + encodeURIComponent(tab_text);

                var downloadLink = document.createElement("a");
                downloadLink.href = uri;

                var bkFileEnd = "";
                if(isExportBKFile === true){
                    bkFileEnd = "_BK";
                }

                if(Lobby.Utils.objectNotNull(fullReplaceName)){
                    downloadLink.download = fullReplaceName + bkFileEnd + ".xls";
                }
                else {
                    downloadLink.download = LobbyC.GameSlot.createDownloadName() +
                        (Lobby.Utils.objectNotNull(additionName) ? "_" + additionName : "") + bkFileEnd+
                        ".xls";
                }

                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                return null;
                //sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));
            }

            return (sa);
        }
        fnExcelReport(isExportBKFile);

        // clear tmp table

        var divContainTable = document.getElementById('tableTestAlgorithm');
        divContainTable.innerHTML = '';
    };

    /**
     * export text xls file
     */
    this.test = function(){
        this.exportTable(
            [
                ["stt","hoten","gioitinh","tuoi"],
                ["2","bobaytutu nhe","nam","100"],
                ["3","bobaytutu tudo","nu","1400"],
                ["4","bobaytutu hohen","gay","1400"]
            ]
        );
    };
};