var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();
var util = require('util');
var Twitter = require('twitter');


// ツイッターのキーとシークレットトークンを初期化（環境変数を使用）
var twitter = new Twitter({
    consumer_key: process.env['CONSUMER_KEY'],
    consumer_secret: process.env['CONSUMER_SECRET'],
    access_token_key: process.env['ACCESS_TOKEN_KEY'],
    access_token_secret: process.env['ACCESS_TOKEN_SECRET']
  })

/*
  var tipsArray = [
    "医学連携といって、学校で多動性のある生徒は精神科への受診を勧められます。そして精神薬が子供に処方されます。もし処方されたらまずはお母さんが飲んでみてください。子供に飲ませるべきか、それでわかります",
    "米国ワシントン大学の研究で、ついに「安全な飲酒量の目安はない。健康損失リスクを最小限に抑えるアルコール摂取量は、いちにちあたりゼロ」とする研究が発表されました",
    "欧米人の30パーセントしか肉を食べない日本人には卵3個、肉200g、プロテイン20gを二回が最優先事項です",
    "国分太一、吉澤ひとみで注目を集めたアルコール依存症。それは否認の病気とも言われています。「自分は違う」。そう思っている人で毎日何杯も飲んでいる方はアルコール依存症です。治す方法は断酒です。軽症なら半年でいいでしょう。重症なら一生です",
    "九州場所で優勝した貴景勝。はじめてカップラーメンを食べた時、「プラスチックを食べているようだ」と吐いたそうです。お母さまの食事への気遣いがうかがわれます",
    "難病と呼ばれる多くの病気はほとんど神経性のものばかりです。治せないから難病扱いされているだけですが、現代医療は中枢神経系の診断ができないだけです。MRIでナノレベルのシナプスやレセプターは見えません。医療技術はとてつもなく遅れているのです",
    "医者、とくに外科医、麻酔科医の自殺率は一般の3倍近く多いです。人手不足、医療過失のプレッシャー、そしてやはり不眠からはじまって精神薬を服用するようになり、犠牲になるわけです",
    "いまはウイルス性の風邪に抗生物質は効果がないことは常識ですが、昔は研修医はよくオーベンに、風邪には必ず抗生物質を処方するように、と指導されていました。いまの医療常識も急速にアップデートされていくはずです",
    "鳥類、哺乳類も肝臓でビタミンCを合成できます。が、人類は2500万年前にビタミンC合成能力を失いました。白血球は十分量のビタミンCがないと十分な働きができない。水晶体もその代謝にビタミンCを必要とします。また、鉛、水銀、カドミウムなどの重金属の体外への排泄を促します",
    "ATPはエネルギー通貨であり、体を動かすにも、頭を使うにも、呼吸するにも、心臓を動かすにも、食物を消化吸収するにも、各種ホルモンを合成するにも必要。そしてATPを作り出すのがミトコンドリア。ATPは合成されてから1分以内に消費されてしまいますので、常に合成され続けています",
    "evidence based medicine。エビデンス、つまり公式論文にもとづいて医療をほどこす、今の医療方針の本流ですが、じつはそれらの論文のほとんどが製薬会社のスポンサーがついた論文です。いまの医療がクスリ漬けになるわけです。",
    "精白した小麦には栄養が入っていません。米国では1942年から国内に流通する小麦粉に鉄、B1、B2、ナイアシン、合成葉酸を入れることが義務付けられており、現在も継続されています",
    "耳鼻科医は両手が使えるのですから本来は理学療法に向いているドクターです。それが今では膿栓ひとつ取り出せない、あえて頼むと恐る恐る扁桃腺を押したりしている。さいごは放置しておいても問題ないと言われギブアップ。情けないことです",
    "整形外科に通って膝の痛みがよくならないのはドクターが患部しか見ないからです。カラダのさまざまな箇所、たとえば骨盤、内蔵の位置、血液の不調が膝にきているとは考えないのでよくなるわけがありません",
    "風邪をひいて耳鼻科にいくと、ノドの奥にクスリを塗ってもらいますが、マトが外れてます。ほんとうに痛いのは上咽頭といって、鼻の奥からノドまでの空間です。この部分に塩化亜鉛液を塗る。昭和のころはどこの耳鼻科でも行っていた理学療法です。今はかわりに抗炎症剤を処方します",
    "呼吸。それは植物の光合成と同じくらい不思議な生化学反応です。息を吸うことで全身をスキャンして、息を吐くことで不調箇所を修復します。ただ単に、酸素と二酸化炭素の交換作業ではないのです"
  ]
*/


exports.handler = function (event, context) {
    /*    var tips = tipsArray[Math.floor(Math.random() * tipsArray.length)]


        // 自動投稿
        twitter.post('statuses/update', {status: tips}, (err, tweet, response)=> {
            if(err) {
              return console.log(err)
            }else{
              return console.log(tweet)
            }
        })

    */

    // DynamoDBのtipsテーブルをScanしItem総数を得て、Math.floor(Math.random() * length)で総数内のランダムな整数を獲得
    var params = {
        TableName: 'tips',
        Select: "COUNT" // アイテム総数を返すパラメーター。コマンドであれば`aws dynamodb scan --table-name tips --select COUNT`
    };

    docClient.scan(params, function(err, data){
        if(err){
              console.log(err);
        }else{
            console.log('バカボンのママ');
            console.log('Scanデータは　' + util.inspect(data,false,null));  //結果：Scanデータは　{ Count: 16, ScannedCount: 16 }
            console.log('data["Count"]は　' + data["Count"]); //結果：data["Count"]は　16
            var length = data["Count"];
            randomNum = Math.floor(Math.random() * length);
            console.log('randomNumは　' + randomNum);
            callTipAndTweet(randomNum);
        }
    });

    // ランダム整数を引数にtipsテーブルからランダムにTip文字列を獲得、それをツイート
    function callTipAndTweet(arg){
        var randomNum = arg;
        var params = {
            TableName: 'tips',
            Key: {                   // SQLのwhere条件文にあたるパラメーター。Keyの'K'は大文字であることに注意！
                'ID': randomNum
            }
        };
        docClient.get(params, function(err,data) {
            if(err){
                console.log(err);
            }else{
                console.log('バカボンのパパ')
                var result = JSON.stringify(data.Item)
                console.log('data.Itemは　' + result);    //結果例：data.Itemは　{"ID":3,"Tip":"欧米人の30パーセントしか肉を食べない日本人には卵3個、肉200g、プロテイン20gを二回が最優先事項です"}
                var result = JSON.parse(result);            
                console.log('Tip文字列は　'　+ result.Tip); //結果例：Tip文字列は　欧米人の30パーセントしか肉を食べない日本人には卵3個、肉200g、プロテイン20gを二回が最優先事項です

                // ツイート自動投稿
                twitter.post('statuses/update', {status: result.Tip}, (err, tweet, response)=> {
                    if(err) {
                        return console.log(err)
                    }else{
                        return console.log(tweet)
                    }
                })
            }
        })
    }
}