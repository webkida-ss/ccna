export type Term = {
  id: string
  title: string
  reading?: string
  category: string
  summary: string
  point: string
  tips: string
  related: string[]
}

type BaseTerm = Omit<Term, 'tips'>

const baseTerms: BaseTerm[] = [
  {
    id: 'subnet-mask',
    title: 'サブネットマスク',
    category: 'ネットワーク基礎',
    summary: 'IPアドレスのネットワーク部とホスト部を区別する値。',
    point: 'CIDRでは /24 のように表します。',
    related: ['IPv4', 'L3', 'アドレス', 'CIDR', 'サブネット']
  },
  {
    id: 'osi-model',
    title: 'OSI参照モデル',
    category: 'OSI参照モデル / TCP/IP',
    summary: '通信機能を7階層で整理したモデル。',
    point: '各層の役割、PDU、代表プロトコルを押さえます。',
    related: ['モデル', '階層', 'PDU', 'カプセル化', 'TCP/IP']
  },
  {
    id: 'vlan',
    title: 'VLAN',
    reading: 'Virtual LAN',
    category: 'スイッチング',
    summary: 'スイッチ上でネットワークを論理的に分ける技術。',
    point: '異なるVLAN間の通信にはルーティングが必要です。',
    related: ['略語', 'L2', 'スイッチ', 'ブロードキャスト', 'トランク', 'アクセスポート']
  },
  {
    id: 'stp',
    title: 'STP',
    reading: 'Spanning Tree Protocol',
    category: 'スイッチング',
    summary: 'レイヤ2のループを防ぐプロトコル。',
    point: 'ルートブリッジ、ポート状態、BPDUが重要です。',
    related: ['略語', 'L2', 'スイッチ', 'ループ防止', 'BPDU', 'ルートブリッジ']
  },
  {
    id: 'ospf',
    title: 'OSPF',
    reading: 'Open Shortest Path First',
    category: 'ルーティング',
    summary: 'リンクステート型の動的ルーティングプロトコル。',
    point: 'エリア、DR/BDR、コスト、ネイバー関係が頻出です。',
    related: ['略語', 'L3', 'ルーティング', '動的ルーティング', 'DR/BDR', 'リンクステート']
  },
  {
    id: 'acl',
    title: 'ACL',
    reading: 'Access Control List',
    category: 'セキュリティ',
    summary: '通信を許可または拒否する条件リスト。',
    point: '標準ACL、拡張ACL、in/outの向きが重要です。',
    related: ['略語', 'セキュリティ', 'フィルタリング', '標準ACL', '拡張ACL', 'ワイルドカードマスク']
  },
  {
    id: 'ssid',
    title: 'SSID',
    reading: 'Service Set Identifier',
    category: 'ワイヤレス',
    summary: '無線LANネットワークを識別する名前。',
    point: '暗号化はWPA2/WPA3などで行います。',
    related: ['略語', 'ワイヤレス', '無線LAN', 'WPA2', 'WPA3', 'アクセスポイント']
  },
  {
    id: 'dhcp',
    title: 'DHCP',
    reading: 'Dynamic Host Configuration Protocol',
    category: 'ネットワーク基礎',
    summary: 'IPアドレスなどを自動配布するプロトコル。',
    point: 'アドレス、マスク、GW、DNSを配布できます。',
    related: ['略語', 'IPv4', 'アドレス', '自動設定', 'DNS', 'デフォルトゲートウェイ']
  },
  {
    id: 'dns',
    title: 'DNS',
    reading: 'Domain Name System',
    category: 'ネットワーク基礎',
    summary: '名前とIPアドレスを対応付ける仕組み。',
    point: 'FQDNからIPアドレスを引く名前解決で使います。',
    related: ['略語', '名前解決', 'IPアドレス', 'FQDN', 'アプリケーション層']
  },
  {
    id: 'nat',
    title: 'NAT',
    reading: 'Network Address Translation',
    category: 'ルーティング',
    summary: 'IPアドレスを変換して通信する技術。',
    point: 'プライベートIPとグローバルIPの変換で使います。',
    related: ['略語', 'L3', 'IPv4', 'アドレス変換', 'プライベートIP', 'グローバルIP']
  },
  {
    id: 'arp',
    title: 'ARP',
    reading: 'Address Resolution Protocol',
    category: 'ネットワーク基礎',
    summary: 'IPアドレスからMACアドレスを調べるプロトコル。',
    point: '同一ネットワーク内の宛先解決で使います。',
    related: ['略語', 'L2', 'L3', 'MACアドレス', 'IPアドレス', '同一ネットワーク']
  },
  {
    id: 'etherchannel',
    title: 'EtherChannel',
    category: 'スイッチング',
    summary: '複数の物理リンクを1本の論理リンクにまとめる技術。',
    point: '帯域増加と冗長化に使います。',
    related: ['L2', 'スイッチ', '冗長化', '帯域', 'LACP', 'PAgP']
  },
  {
    id: 'tcp',
    title: 'TCP',
    reading: 'Transmission Control Protocol',
    category: 'OSI参照モデル / TCP/IP',
    summary: '信頼性を重視するコネクション型プロトコル。',
    point: '3ウェイハンドシェイク、再送、順序制御が特徴です。',
    related: ['略語', 'L4', 'TCP/IP', '信頼性', 'ポート番号']
  },
  {
    id: 'udp',
    title: 'UDP',
    reading: 'User Datagram Protocol',
    category: 'OSI参照モデル / TCP/IP',
    summary: '高速性を重視するコネクションレス型プロトコル。',
    point: '再送制御を持たず、DNSや音声通信などで使われます。',
    related: ['略語', 'L4', 'TCP/IP', '高速', 'ポート番号']
  },
  {
    id: 'icmp',
    title: 'ICMP',
    reading: 'Internet Control Message Protocol',
    category: 'ネットワーク基礎',
    summary: '通信状態やエラーを通知するプロトコル。',
    point: 'pingやtracerouteの理解でよく出ます。',
    related: ['略語', 'L3', 'ping', 'traceroute', 'エラー通知']
  },
  {
    id: 'mac-address',
    title: 'MACアドレス',
    category: 'スイッチング',
    summary: 'NICに割り当てられるレイヤ2の物理アドレス。',
    point: 'スイッチはMACアドレステーブルで転送先を判断します。',
    related: ['L2', 'スイッチ', 'ARP', 'フレーム', 'MACアドレステーブル']
  },
  {
    id: 'broadcast-domain',
    title: 'ブロードキャストドメイン',
    category: 'スイッチング',
    summary: 'ブロードキャストが届く範囲。',
    point: 'VLANで分割でき、ルータで区切られます。',
    related: ['L2', 'VLAN', 'ブロードキャスト', 'ルータ', 'スイッチ']
  },
  {
    id: 'collision-domain',
    title: 'コリジョンドメイン',
    category: 'スイッチング',
    summary: 'イーサネットで衝突が起こり得る範囲。',
    point: 'スイッチの各ポートは基本的に別ドメインです。',
    related: ['L1', 'L2', 'スイッチ', 'ハブ', 'イーサネット']
  },
  {
    id: 'trunk-port',
    title: 'トランクポート',
    category: 'スイッチング',
    summary: '複数VLANの通信を通すポート。',
    point: '802.1QタグでVLANを識別します。',
    related: ['L2', 'VLAN', '802.1Q', 'スイッチ', 'タグ']
  },
  {
    id: 'access-port',
    title: 'アクセスポート',
    category: 'スイッチング',
    summary: '単一VLANに所属するポート。',
    point: 'PCやプリンタなど端末接続でよく使います。',
    related: ['L2', 'VLAN', 'スイッチ', '端末', 'アクセスポート']
  },
  {
    id: 'native-vlan',
    title: 'Native VLAN',
    category: 'スイッチング',
    summary: 'トランク上でタグなしフレームを扱うVLAN。',
    point: '両端で不一致だと通信トラブルの原因になります。',
    related: ['L2', 'VLAN', 'トランク', '802.1Q', 'タグ']
  },
  {
    id: 'inter-vlan-routing',
    title: 'Inter-VLAN Routing',
    category: 'ルーティング',
    summary: '異なるVLAN間で通信させるルーティング。',
    point: 'SVIやRouter-on-a-Stickで実現します。',
    related: ['L3', 'VLAN', 'SVI', 'ルーティング', 'Router-on-a-Stick']
  },
  {
    id: 'svi',
    title: 'SVI',
    reading: 'Switch Virtual Interface',
    category: 'スイッチング',
    summary: 'スイッチ上の仮想的なVLANインターフェース。',
    point: '管理IPやL3スイッチのVLAN間ルーティングで使います。',
    related: ['略語', 'L3', 'VLAN', 'L3スイッチ', '管理IP']
  },
  {
    id: 'lacp',
    title: 'LACP',
    reading: 'Link Aggregation Control Protocol',
    category: 'スイッチング',
    summary: 'EtherChannelを動的に形成する標準プロトコル。',
    point: 'IEEE 802.3adとして使われます。',
    related: ['略語', 'L2', 'EtherChannel', '冗長化', '帯域']
  },
  {
    id: 'pagp',
    title: 'PAgP',
    reading: 'Port Aggregation Protocol',
    category: 'スイッチング',
    summary: 'Cisco独自のEtherChannel形成プロトコル。',
    point: 'auto/desirableのモードを押さえます。',
    related: ['略語', 'L2', 'EtherChannel', 'Cisco', '冗長化']
  },
  {
    id: 'bpdu',
    title: 'BPDU',
    reading: 'Bridge Protocol Data Unit',
    category: 'スイッチング',
    summary: 'STPでスイッチ同士が交換する制御情報。',
    point: 'ルートブリッジ選出やループ防止に使います。',
    related: ['略語', 'L2', 'STP', 'ルートブリッジ', 'ループ防止']
  },
  {
    id: 'rstp',
    title: 'RSTP',
    reading: 'Rapid Spanning Tree Protocol',
    category: 'スイッチング',
    summary: 'STPより高速に収束するループ防止プロトコル。',
    point: 'IEEE 802.1wとして定義されています。',
    related: ['略語', 'L2', 'STP', 'ループ防止', '収束']
  },
  {
    id: 'static-route',
    title: 'スタティックルート',
    category: 'ルーティング',
    summary: '管理者が手動で設定する経路情報。',
    point: '小規模やバックアップ経路でよく使います。',
    related: ['L3', 'ルーティング', '経路', 'デフォルトルート', '手動設定']
  },
  {
    id: 'default-route',
    title: 'デフォルトルート',
    category: 'ルーティング',
    summary: '宛先が不明な通信を送るための経路。',
    point: 'IPv4では0.0.0.0/0で表します。',
    related: ['L3', 'ルーティング', 'スタティックルート', 'ゲートウェイ', 'IPv4']
  },
  {
    id: 'routing-table',
    title: 'ルーティングテーブル',
    category: 'ルーティング',
    summary: '宛先ネットワークへの経路をまとめた表。',
    point: '最長一致で転送先が決まります。',
    related: ['L3', 'ルーティング', '経路', '最長一致', 'ルータ']
  },
  {
    id: 'administrative-distance',
    title: 'AD値',
    reading: 'Administrative Distance',
    category: 'ルーティング',
    summary: '経路情報の信頼度を示す値。',
    point: '値が小さい経路ほど優先されます。',
    related: ['略語', 'L3', 'ルーティング', '経路選択', '信頼度']
  },
  {
    id: 'metric',
    title: 'メトリック',
    category: 'ルーティング',
    summary: '同じルーティング方式内で経路を選ぶ基準。',
    point: 'OSPFでは主にコストを使います。',
    related: ['L3', 'ルーティング', 'OSPF', 'コスト', '経路選択']
  },
  {
    id: 'ipv6',
    title: 'IPv6',
    reading: 'Internet Protocol version 6',
    category: 'ネットワーク基礎',
    summary: '128ビットのIPアドレスを使うプロトコル。',
    point: '省略表記、プレフィックス、近隣探索が頻出です。',
    related: ['略語', 'L3', 'アドレス', 'プレフィックス', 'NDP']
  },
  {
    id: 'ndp',
    title: 'NDP',
    reading: 'Neighbor Discovery Protocol',
    category: 'ネットワーク基礎',
    summary: 'IPv6で近隣ノードを発見する仕組み。',
    point: 'IPv4のARPに近い役割を持ちます。',
    related: ['略語', 'IPv6', 'L3', '近隣探索', 'ICMPv6']
  },
  {
    id: 'slaac',
    title: 'SLAAC',
    reading: 'Stateless Address Autoconfiguration',
    category: 'ネットワーク基礎',
    summary: 'IPv6アドレスを自動生成する仕組み。',
    point: 'ルータ広告を使って自動設定します。',
    related: ['略語', 'IPv6', '自動設定', 'ルータ広告', 'アドレス']
  },
  {
    id: 'pat',
    title: 'PAT',
    reading: 'Port Address Translation',
    category: 'ルーティング',
    summary: 'ポート番号も使ってNAT変換する方式。',
    point: '多くの端末で1つのグローバルIPを共有できます。',
    related: ['略語', 'NAT', 'L3', 'ポート番号', 'アドレス変換']
  },
  {
    id: 'wan',
    title: 'WAN',
    reading: 'Wide Area Network',
    category: 'ネットワーク基礎',
    summary: '離れた拠点同士をつなぐ広域ネットワーク。',
    point: 'LANとの違いと回線種別を押さえます。',
    related: ['略語', 'ネットワーク基礎', 'LAN', '拠点間', '回線']
  },
  {
    id: 'lan',
    title: 'LAN',
    reading: 'Local Area Network',
    category: 'ネットワーク基礎',
    summary: '建物や拠点内のローカルネットワーク。',
    point: 'スイッチ、VLAN、IP設計と関連します。',
    related: ['略語', 'ネットワーク基礎', 'WAN', 'スイッチ', 'VLAN']
  },
  {
    id: 'vpn',
    title: 'VPN',
    reading: 'Virtual Private Network',
    category: 'セキュリティ',
    summary: '仮想的な専用線として通信を保護する技術。',
    point: '拠点間VPNやリモートアクセスVPNがあります。',
    related: ['略語', 'セキュリティ', '暗号化', 'WAN', 'リモートアクセス']
  },
  {
    id: 'port-security',
    title: 'Port Security',
    category: 'セキュリティ',
    summary: 'スイッチポートで接続端末を制限する機能。',
    point: 'sticky MACや違反時アクションが頻出です。',
    related: ['L2', 'セキュリティ', 'スイッチ', 'MACアドレス', 'アクセス制御']
  },
  {
    id: 'aaa',
    title: 'AAA',
    reading: 'Authentication, Authorization, Accounting',
    category: 'セキュリティ',
    summary: '認証・認可・記録をまとめた仕組み。',
    point: 'RADIUSやTACACS+と一緒に出ます。',
    related: ['略語', 'セキュリティ', '認証', '認可', 'RADIUS']
  },
  {
    id: 'radius',
    title: 'RADIUS',
    reading: 'Remote Authentication Dial-In User Service',
    category: 'セキュリティ',
    summary: '認証情報を集中管理するプロトコル。',
    point: 'AAAや802.1Xと関連します。',
    related: ['略語', 'セキュリティ', 'AAA', '認証', '802.1X']
  },
  {
    id: 'tacacs',
    title: 'TACACS+',
    reading: 'Terminal Access Controller Access-Control System Plus',
    category: 'セキュリティ',
    summary: 'Cisco系で使われる認証プロトコル。',
    point: '管理者ログインの制御でよく使います。',
    related: ['略語', 'セキュリティ', 'AAA', '認証', 'Cisco']
  },
  {
    id: 'ssh',
    title: 'SSH',
    reading: 'Secure Shell',
    category: 'セキュリティ',
    summary: '暗号化されたリモート管理プロトコル。',
    point: 'Telnetより安全な管理アクセスとして使います。',
    related: ['略語', 'セキュリティ', '暗号化', 'リモート管理', 'CLI']
  },
  {
    id: 'telnet',
    title: 'Telnet',
    category: 'セキュリティ',
    summary: '暗号化されないリモート管理プロトコル。',
    point: '実運用ではSSHを使うのが基本です。',
    related: ['セキュリティ', 'リモート管理', 'CLI', 'SSH', '平文']
  },
  {
    id: 'wpa2',
    title: 'WPA2',
    reading: 'Wi-Fi Protected Access 2',
    category: 'ワイヤレス',
    summary: '無線LANで使われる暗号化方式。',
    point: 'CCNAではWPA3との違いも押さえます。',
    related: ['略語', 'ワイヤレス', '無線LAN', '暗号化', 'SSID']
  },
  {
    id: 'wpa3',
    title: 'WPA3',
    reading: 'Wi-Fi Protected Access 3',
    category: 'ワイヤレス',
    summary: 'WPA2より新しい無線LAN保護方式。',
    point: 'SAEなどにより安全性が向上しています。',
    related: ['略語', 'ワイヤレス', '無線LAN', '暗号化', 'SSID']
  },
  {
    id: 'access-point',
    title: 'アクセスポイント',
    category: 'ワイヤレス',
    summary: '無線端末を有線ネットワークへ接続する機器。',
    point: 'SSID、チャネル、電波範囲と関連します。',
    related: ['ワイヤレス', '無線LAN', 'SSID', 'チャネル', 'AP']
  },
  {
    id: 'wlc',
    title: 'WLC',
    reading: 'Wireless LAN Controller',
    category: 'ワイヤレス',
    summary: '複数のAPを集中管理する装置。',
    point: '大規模無線LANで設定や制御をまとめます。',
    related: ['略語', 'ワイヤレス', '無線LAN', 'AP', '集中管理']
  },
  {
    id: 'roaming',
    title: 'ローミング',
    category: 'ワイヤレス',
    summary: '端末が接続先APを切り替えながら通信すること。',
    point: '移動中の無線接続維持で重要です。',
    related: ['ワイヤレス', '無線LAN', 'AP', 'SSID', '移動']
  },
  {
    id: 'snmp',
    title: 'SNMP',
    reading: 'Simple Network Management Protocol',
    category: 'ネットワーク管理',
    summary: 'ネットワーク機器を監視・管理するプロトコル。',
    point: 'MIB、OID、trapなどの用語が出ます。',
    related: ['略語', 'ネットワーク管理', '監視', 'MIB', 'trap']
  },
  {
    id: 'syslog',
    title: 'Syslog',
    category: 'ネットワーク管理',
    summary: '機器のログを外部サーバへ送る仕組み。',
    point: '障害解析や監査で使います。',
    related: ['ネットワーク管理', 'ログ', '監視', '障害解析', 'サーバ']
  },
  {
    id: 'ntp',
    title: 'NTP',
    reading: 'Network Time Protocol',
    category: 'ネットワーク管理',
    summary: '機器の時刻を同期するプロトコル。',
    point: 'ログの時刻を正しく揃えるために重要です。',
    related: ['略語', 'ネットワーク管理', '時刻同期', 'ログ', 'UDP']
  },
  {
    id: 'cdp',
    title: 'CDP',
    reading: 'Cisco Discovery Protocol',
    category: 'ネットワーク管理',
    summary: '隣接Cisco機器を発見するプロトコル。',
    point: '隣接機器の情報確認に使います。',
    related: ['略語', 'Cisco', '隣接機器', 'ネットワーク管理', 'L2']
  },
  {
    id: 'lldp',
    title: 'LLDP',
    reading: 'Link Layer Discovery Protocol',
    category: 'ネットワーク管理',
    summary: '隣接機器を発見する標準プロトコル。',
    point: 'Cisco以外の機器とも使える標準方式です。',
    related: ['略語', 'L2', '隣接機器', 'ネットワーク管理', '標準']
  },
  {
    id: 'qos',
    title: 'QoS',
    reading: 'Quality of Service',
    category: 'ネットワーク管理',
    summary: '通信の優先度を制御する仕組み。',
    point: '音声や重要通信を優先するために使います。',
    related: ['略語', 'ネットワーク管理', '優先制御', '音声', '帯域']
  },
  {
    id: 'poe',
    title: 'PoE',
    reading: 'Power over Ethernet',
    category: 'スイッチング',
    summary: 'LANケーブルで電力も供給する技術。',
    point: 'APやIP電話、カメラでよく使います。',
    related: ['略語', 'L1', 'スイッチ', 'AP', 'IP電話']
  },
  {
    id: 'mtu',
    title: 'MTU',
    reading: 'Maximum Transmission Unit',
    category: 'ネットワーク基礎',
    summary: '一度に送れる最大パケットサイズ。',
    point: '大きすぎると分割や破棄の原因になります。',
    related: ['略語', 'パケット', 'L3', 'サイズ', 'フラグメント']
  },
  {
    id: 'mtbf',
    title: 'MTBF',
    reading: 'Mean Time Between Failures',
    category: 'ネットワーク管理',
    summary: '故障と故障の間の平均時間。',
    point: '信頼性を表す指標として使われます。',
    related: ['略語', 'ネットワーク管理', '信頼性', '障害', '運用']
  },
  {
    id: 'json',
    title: 'JSON',
    reading: 'JavaScript Object Notation',
    category: '自動化',
    summary: 'データ交換でよく使われる軽量フォーマット。',
    point: 'APIレスポンスや設定データで頻出です。',
    related: ['略語', '自動化', 'API', 'データ形式', 'REST']
  },
  {
    id: 'rest-api',
    title: 'REST API',
    reading: 'Representational State Transfer API',
    category: '自動化',
    summary: 'HTTPを使ってリソースを操作するAPI設計。',
    point: 'GET/POST/PUT/DELETEなどのメソッドを使います。',
    related: ['略語', '自動化', 'API', 'HTTP', 'JSON']
  },
  {
    id: 'sdn',
    title: 'SDN',
    reading: 'Software-Defined Networking',
    category: '自動化',
    summary: '制御と転送を分離して管理するネットワーク方式。',
    point: 'コントローラによる集中制御が特徴です。',
    related: ['略語', '自動化', 'コントローラ', '集中管理', 'ネットワーク']
  },
  {
    id: 'controller',
    title: 'コントローラ',
    category: '自動化',
    summary: 'ネットワーク機器を集中制御する管理基盤。',
    point: 'SDNや無線LAN管理で重要な考え方です。',
    related: ['自動化', 'SDN', '集中管理', 'WLC', 'API']
  },
  {
    id: 'northbound-api',
    title: 'Northbound API',
    category: '自動化',
    summary: 'コントローラとアプリ間で使うAPI。',
    point: '上位アプリがネットワークを操作する入口です。',
    related: ['自動化', 'API', 'SDN', 'コントローラ', 'アプリ']
  },
  {
    id: 'southbound-api',
    title: 'Southbound API',
    category: '自動化',
    summary: 'コントローラと機器間で使うAPI。',
    point: '実機への設定投入や状態取得に関わります。',
    related: ['自動化', 'API', 'SDN', 'コントローラ', 'ネットワーク機器']
  }
]

export const tipsByTermId: Record<string, string> = {
  'subnet-mask': '「どこまでがネットワークか」を隠し線で区切るイメージ。',
  'osi-model': '上から「アプセトネデブ」と語呂で7層を思い出す。',
  vlan: 'VはVirtual。物理スイッチ内に仮想の小部屋を作るイメージ。',
  stp: '木構造にしてループを切る。Spanning Treeの名前通り。',
  ospf: 'OpenなShortest Path。最短経路を地図から計算するイメージ。',
  acl: 'Access ControlのList。通信の入場チェック表。',
  ssid: 'Wi-Fi名そのもの。スマホで選ぶネットワーク名。',
  dhcp: '「自動でIPを配る係」と覚える。',
  dns: 'Domain NameをIPへ引く電話帳。',
  nat: 'Network AddressをTranslation。住所を書き換える係。',
  arp: 'IPからMACを聞く。住所から部屋番号を探すイメージ。',
  etherchannel: '複数の線を束ねて太い1本にする。',
  tcp: '確実に届ける。電話のように接続して会話する。',
  udp: '速く投げる。確認なしで投げる宅配便。',
  icmp: '通信確認のメッセージ係。pingで思い出す。',
  'mac-address': 'L2の住所。スイッチが見る宛先。',
  'broadcast-domain': 'ブロードキャストが届く部屋の範囲。',
  'collision-domain': '衝突が起こる可能性のある範囲。',
  'trunk-port': '複数VLANをまとめて通す幹線道路。',
  'access-port': '端末が入る1つのVLAN専用入口。',
  'native-vlan': 'タグなしフレームの受け皿VLAN。',
  'inter-vlan-routing': 'VLAN同士を会話させるにはルータ役が必要。',
  svi: 'Switch上のVirtual Interface。VLANの窓口。',
  lacp: '標準のリンク束ね係。LはLink Aggregation。',
  pagp: 'Cisco独自のリンク束ね係。',
  bpdu: 'STPの会話パケット。橋同士の連絡文。',
  rstp: 'RapidなSTP。収束が速い版。',
  'static-route': '手書きの経路。管理者が決め打ち。',
  'default-route': '迷ったらここへ送る最後の出口。',
  'routing-table': '宛先ごとの道案内表。',
  'administrative-distance': '経路情報の信用度。小さいほど信頼。',
  metric: '同じ方式内での道の良さスコア。',
  ipv6: '128ビットの長いIP。コロン表記で思い出す。',
  ndp: 'IPv6版の近所探し。ARPに近い役割。',
  slaac: 'StateLessにAddressをAuto設定。',
  pat: 'Portも使うNAT。多人数で1つの住所を共有。',
  wan: 'Wideなネットワーク。拠点間をつなぐ。',
  lan: 'Localなネットワーク。社内や自宅の範囲。',
  vpn: 'Virtual Privateなトンネル。',
  'port-security': 'スイッチポートの入場制限。',
  aaa: '認証・認可・記録の3Aセット。',
  radius: '認証をまとめるサーバ係。',
  tacacs: 'Cisco管理者認証でよく出る。',
  ssh: 'Secure Shell。安全なリモートCLI。',
  telnet: '平文の古いリモートCLI。SSHと対比。',
  wpa2: 'Wi-Fiを守る暗号化方式の定番。',
  wpa3: 'WPA2の新しい強化版。',
  'access-point': '無線端末の入口。APと略す。',
  wlc: 'Wireless LANをControlする親機。',
  roaming: 'APをまたいで移動すること。',
  snmp: '機器監視の問い合わせ係。',
  syslog: 'ログを集める仕組み。',
  ntp: 'Network Time。時刻合わせ。',
  cdp: 'Cisco機器の隣人探し。',
  lldp: '標準の隣人探し。CDPの標準版。',
  qos: 'Qualityを守る優先制御。',
  poe: 'EthernetでPowerも送る。',
  mtu: 'Maximumサイズ。1回で送れる最大量。',
  mtbf: '故障までの平均時間。信頼性の指標。',
  json: 'APIでよく見る波括弧データ。',
  'rest-api': 'HTTPメソッドでリソース操作。',
  sdn: 'Softwareでネットワークを定義・制御。',
  controller: '全体をまとめる司令塔。',
  'northbound-api': '上位アプリ向け。北は上。',
  'southbound-api': '下の機器向け。南は現場側。'
}

export const terms: Term[] = baseTerms.map((term) => ({
  ...term,
  tips: tipsByTermId[term.id] ?? '名前・役割・関連タグをセットで覚える。'
}))
