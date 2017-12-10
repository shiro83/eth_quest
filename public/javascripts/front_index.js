  $(function() {
    $('.vote_click').on("click", function(event) {
      // HTMLでの送信をキャンセル
      event.preventDefault();

      // 操作対象のフォーム要素を取得
      var val = $(this).val();

      // 送信
      $.ajax({
        url: "/sum/vote",
        async: false,
        data: {
          "vote": val
        },
        timeout: 10000, // 単位はミリ秒

        // 送信前
        beforeSend: function(xhr, settings) {
          // ボタンを無効化し、二重送信を防止
          $('.vote_click').attr('disabled', true);
        },

        // 応答後
        complete: function(xhr, textStatus) {
          setTimeout(function() {
            // ボタンを有効化し、再送信を許可
            $('.vote_click').attr('disabled', false);
          }, 500);
        },

        // 通信成功時の処理
        success: function(result, textStatus, xhr) {

        },

        // 通信失敗時の処理
        error: function(xhr, textStatus, error) {
          alert('NG...');
        }
      });
    });
  });
