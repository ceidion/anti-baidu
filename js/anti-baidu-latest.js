// Author: http://weibo.com/fanweixiao

(function() {
  var jQuery_cdn = "https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js";
  var jQuery_bpopup_cdn = "https://cdn.jsdelivr.net/gh/dinbror/bpopup@0.11.0/jquery.bpopup.min.js";

  var isBaiduReferrer = (function() {
    var url = document.referrer;
    if (typeof isTest !== 'undefined') {
      url = testURL;
    }

    if (url && (url.search("http[s]?://") > -1)) {
      var refurl = url.match(/:\/\/(.[^/]+)/)[1];
      if (refurl.indexOf("baidu.com") > -1) {
        return true;
      }
    }
    return false;
  })();

  var loader = function() {
    var anti_baidu = function() {
      jQuery.getScript(jQuery_bpopup_cdn)
        .done(function() {
          (function($) {
            $(document).ready(function() {
              var css =
                '<style type="text/css">' +
                '  * {' +
                '    box-sizing: border-box;' +
                '  }' +
                '  .anti-baidu-row::after {' +
                '    content: "";' +
                '    clear: both;' +
                '    display: table;' +
                '  }' +
                '  [class*="anti-baidu-col-"] {' +
                '    float: left;' +
                '    padding: 15px;' +
                '  }' +
                '  .anti-baidu-col-1 {width: 8.33%;}' +
                '  .anti-baidu-col-2 {width: 16.66%;}' +
                '  .anti-baidu-col-3 {width: 25%;}' +
                '  .anti-baidu-col-4 {width: 33.33%;}' +
                '  .anti-baidu-col-5 {width: 41.66%;}' +
                '  .anti-baidu-col-6 {width: 50%;}' +
                '  .anti-baidu-col-7 {width: 58.33%;}' +
                '  .anti-baidu-col-8 {width: 66.66%;}' +
                '  .anti-baidu-col-9 {width: 75%;}' +
                '  .anti-baidu-col-10 {width: 83.33%;}' +
                '  .anti-baidu-col-11 {width: 91.66%;}' +
                '  .anti-baidu-col-12 {width: 100%;}' +
                '  @media only screen and (max-width: 768px) {' +
                '    /* For mobile phones: */' +
                '    [class*="anti-baidu-col-"] {' +
                '      width: 100%;' +
                '    }' +
                '  }' +
                '</style>';

              var nobaiduImgBase64 = "data:image/jpeg;base64,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";

              var antiDiv =
                '<div id="nobaidu_dlg" class="anti-baidu-col-4" style="background-color:#fff; border-radius:15px;color:#000;display:none;padding:20px;min-height:180px;">' +
                '  <div class="anti-baidu-row">' +
                '    <div class="anti-baidu-col-5" style="text-align:center;">' +
                '      <img src="' + nobaiduImgBase64 + '">' +
                '    </div>' +
                '    <div class="anti-baidu-col-7" style="text-align:center;line-height: 30px;padding-top: 35px;">' +
                '      检测到你还在使用百度这个搜索引擎<br>作为一个程序员，这是一种自暴自弃' +
                '    </div>' +
                '  </div>' +
                '  <div class="anti-baidu-row">' +
                '    <div class=anti-baidu-col-12>' +
                '      <p align="center"><b><a href="http://coolshell.cn/articles/9308.html">做环保的程序员，从不用百度开始！</a></b></p>' +
                '    </div>' +
                '  </div>' +
                '</div>';
              $("head").append(css);
              $("body").append(antiDiv);
              if (isBaiduReferrer) {
                $('#nobaidu_dlg').bPopup();
              }
            });
          })(jQuery);
        })
        .fail(function() {});
    };

    if (typeof jQuery === 'undefined') {
      function getScript(url, success) {
        var script = document.createElement('script');
        script.src = url;

        var head = document.getElementsByTagName('head')[0],
          done = false;

        script.onload = script.onreadystatechange = function() {
          if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
            done = true;

            success();
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);
          };
        };
        head.appendChild(script);
      };

      getScript(jQuery_cdn, function() {
        if (typeof jQuery == 'undefined') {
          return;
        } else {
          anti_baidu();
        }
      });
    } else {
      anti_baidu();
    };
  };

  if (isBaiduReferrer) {
    loader();
  }
})();