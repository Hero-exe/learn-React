import React, { useState } from 'react';

/**
 * Props（プロパティ）の受け渡しを学習するためのコンポーネント
 * 様々なPropsの使い方とパターンを実際に試してみよう！
 */

// === 1. 基本的なPropsの受け渡し ===
interface BasicCardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const BasicCard: React.FC<BasicCardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-32 object-cover rounded mb-3" />
      )}
      <h3 className="font-bold text-lg text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

// === 2. 様々な型のPropsを受け取るコンポーネント ===
interface UserProfileProps {
  name: string;
  age: number;
  isStudent: boolean;
  hobbies: string[];
  address: {
    city: string;
    prefecture: string;
  };
  favoriteColor?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  name, 
  age, 
  isStudent, 
  hobbies, 
  address,
  favoriteColor = "青"
}) => {
  return (
    <div className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex items-center space-x-3 mb-4">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: favoriteColor }}
        >
          {name.charAt(0)}
        </div>
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-sm text-gray-600">{age}歳 • {isStudent ? '学生' : '社会人'}</p>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <p><span className="font-semibold">住所:</span> {address.prefecture}{address.city}</p>
        <p><span className="font-semibold">好きな色:</span> {favoriteColor}</p>
        <div>
          <span className="font-semibold">趣味:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {hobbies.map((hobby, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// === 3. 関数をPropsとして受け取るコンポーネント ===
interface InteractiveButtonProps {
  label: string;
  onClick: () => void;
  onHover?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  label,
  onClick,
  onHover,
  variant = 'primary',
  size = 'medium',
  disabled = false
}) => {
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      disabled={disabled}
      className={`rounded transition-colors ${
        disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : variantClasses[variant]
      } ${sizeClasses[size]}`}
    >
      {label}
    </button>
  );
};

// === 4. childrenとその他のPropsを組み合わせ ===
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, size = 'medium', children }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg ${sizeClasses[size]} w-full mx-4 max-h-96 overflow-y-auto`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

// === 5. コンポーネントをPropsとして渡す ===
interface ContainerProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ header, footer, children, className = '' }) => {
  return (
    <div className={`border rounded-lg overflow-hidden ${className}`}>
      <div className="bg-gray-100 p-3 border-b">
        {header}
      </div>
      <div className="p-4">
        {children}
      </div>
      <div className="bg-gray-50 p-3 border-t">
        {footer}
      </div>
    </div>
  );
};

// === 6. デフォルトPropsの使用例 ===
interface ProductCardProps {
  name: string;
  price: number;
  currency?: string;
  discountPercent?: number;
  isInStock?: boolean;
  rating?: number;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  currency = '円',
  discountPercent = 0,
  isInStock = true,
  rating = 0,
  onAddToCart
}) => {
  const discountedPrice = price * (1 - discountPercent / 100);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="font-bold text-lg mb-2">{name}</h3>
      
      <div className="mb-3">
        {discountPercent > 0 ? (
          <div className="space-y-1">
            <span className="text-gray-500 line-through text-sm">
              {price.toLocaleString()}{currency}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-red-600 font-bold text-lg">
                {Math.floor(discountedPrice).toLocaleString()}{currency}
              </span>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                {discountPercent}%OFF
              </span>
            </div>
          </div>
        ) : (
          <span className="font-bold text-lg">
            {price.toLocaleString()}{currency}
          </span>
        )}
      </div>

      {rating > 0 && (
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
              ★
            </span>
          ))}
          <span className="ml-1 text-sm text-gray-600">({rating})</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className={`text-sm ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
          {isInStock ? '在庫あり' : '在庫切れ'}
        </span>
        {onAddToCart && (
          <InteractiveButton
            label="カートに追加"
            onClick={onAddToCart}
            variant={isInStock ? 'primary' : 'secondary'}
            size="small"
            disabled={!isInStock}
          />
        )}
      </div>
    </div>
  );
};

// === メインの学習コンポーネント ===
export const PropsBasics: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [hoverCount, setHoverCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // サンプルデータ
  const sampleUser = {
    name: "田中太郎",
    age: 28,
    isStudent: false,
    hobbies: ["プログラミング", "映画鑑賞", "料理", "読書"],
    address: {
      city: "渋谷区",
      prefecture: "東京都"
    },
    favoriteColor: "#6366F1"
  };

  const sampleProducts = [
    { name: "React入門書", price: 3000, rating: 5, discountPercent: 20 },
    { name: "TypeScript完全ガイド", price: 4500, rating: 4, discountPercent: 0 },
    { name: "プログラミング学習セット", price: 8000, rating: 3, discountPercent: 30, isInStock: false }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        🎁 Props（プロパティ）の受け渡しを学ぼう！
      </h1>

      {/* === 1. 基本的なProps === */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">1️⃣ 基本的なPropsの受け渡し</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <BasicCard 
            title="React学習"
            description="Reactの基礎から応用まで学べる完全ガイド"
            imageUrl="/vite.svg"
          />
          <BasicCard 
            title="JavaScript基礎"
            description="プログラミングの基本となるJavaScriptを学ぼう"
          />
          <BasicCard 
            title="TypeScript入門"
            description="型安全なプログラミングでバグを減らそう"
            imageUrl="/vite.svg"
          />
        </div>
        <div className="bg-gray-50 p-3 rounded text-sm">
          <code>
            {`<BasicCard 
  title="React学習"
  description="Reactの基礎から応用まで..."
  imageUrl="/vite.svg"
/>`}
          </code>
        </div>
      </section>

      {/* === 2. 様々な型のProps === */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-green-600">2️⃣ 様々な型のPropsを受け取る</h2>
        <div className="mb-4">
          <UserProfile {...sampleUser} />
        </div>
        <div className="bg-gray-50 p-3 rounded text-sm">
          <code>
            {`interface UserProfileProps {
  name: string;           // 文字列
  age: number;           // 数値
  isStudent: boolean;    // 真偽値
  hobbies: string[];     // 配列
  address: {             // オブジェクト
    city: string;
    prefecture: string;
  };
  favoriteColor?: string; // オプショナル
}`}
          </code>
        </div>
      </section>

      {/* === 3. 関数をPropsとして渡す === */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-purple-600">3️⃣ 関数をPropsとして渡す</h2>
        <div className="space-y-4 mb-4">
          <div className="flex flex-wrap gap-3">
            <InteractiveButton
              label={`クリック (${clickCount}回)`}
              onClick={() => setClickCount(prev => prev + 1)}
              onHover={() => setHoverCount(prev => prev + 1)}
              variant="primary"
            />
            <InteractiveButton
              label="成功ボタン"
              onClick={() => alert('成功しました！')}
              variant="success"
              size="large"
            />
            <InteractiveButton
              label="警告ボタン"
              onClick={() => alert('注意してください')}
              variant="warning"
              size="small"
            />
            <InteractiveButton
              label="無効ボタン"
              onClick={() => {}}
              variant="danger"
              disabled={true}
            />
          </div>
          <p className="text-sm text-gray-600">
            ホバー回数: {hoverCount}回 | クリック回数: {clickCount}回
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded text-sm">
          <code>
            {`<InteractiveButton
  label="クリック"
  onClick={() => setClickCount(prev => prev + 1)}
  onHover={() => setHoverCount(prev => prev + 1)}
  variant="primary"
/>`}
          </code>
        </div>
      </section>

      {/* === 4. childrenプロパティ === */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-red-600">4️⃣ childrenプロパティの活用</h2>
        <div className="mb-4">
          <InteractiveButton
            label="モーダルを開く"
            onClick={() => setIsModalOpen(true)}
            variant="primary"
          />
        </div>
        
        <Container
          header={<h3 className="font-bold">ヘッダー部分</h3>}
          footer={<p className="text-sm text-gray-600">フッター部分</p>}
          className="mb-4"
        >
          <p>この部分がchildrenとして渡された内容です。</p>
          <p>どんなコンテンツでも自由に配置できます！</p>
          <InteractiveButton
            label="中身のボタン"
            onClick={() => alert('childrenの中のボタンです')}
            variant="secondary"
            size="small"
          />
        </Container>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="サンプルモーダル"
          size="medium"
        >
          <p className="mb-4">これもchildrenプロパティの例です！</p>
          <p className="mb-4">モーダルの中身を自由にカスタマイズできます。</p>
          <InteractiveButton
            label="閉じる"
            onClick={() => setIsModalOpen(false)}
            variant="danger"
            size="small"
          />
        </Modal>
      </section>

      {/* === 5. デフォルトPropsの使用 === */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-orange-600">5️⃣ デフォルトPropsの使用</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {sampleProducts.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
              onAddToCart={() => alert(`${product.name}をカートに追加しました！`)}
            />
          ))}
        </div>
        <div className="bg-gray-50 p-3 rounded text-sm">
          <code>
            {`const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  currency = '円',        // デフォルト値
  discountPercent = 0,    // デフォルト値
  isInStock = true,       // デフォルト値
  rating = 0,            // デフォルト値
  onAddToCart
}) => { ... }`}
          </code>
        </div>
      </section>

      {/* === 学習ポイント === */}
      <section className="mb-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200">
        <h2 className="text-xl font-semibold mb-3 text-orange-700">
          🎯 Propsの重要ポイント
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-bold mb-2">✅ Propsの特徴:</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• 親から子コンポーネントにデータを渡す</li>
              <li>• 読み取り専用（変更不可）</li>
              <li>• 様々な型のデータを渡せる</li>
              <li>• デフォルト値を設定可能</li>
              <li>• オプショナル（?）で任意に</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">🛠️ 使用パターン:</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• プリミティブ型（string, number, boolean）</li>
              <li>• 配列・オブジェクト</li>
              <li>• 関数（イベントハンドラー）</li>
              <li>• React要素（children）</li>
              <li>• 分割代入で受け取る</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 実習課題 */}
      <section className="p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 text-purple-700">
          🎯 実習課題
        </h2>
        <div className="bg-white p-3 rounded border">
          <p className="mb-2">以下を試してみよう：</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>sampleUserの値を変更してUserProfileの表示を変えてみる</li>
            <li>新しいProductCardを追加してみる</li>
            <li>独自のPropsを持つコンポーネントを作成してみる</li>
            <li>関数Propsを使って親子間でデータをやり取りしてみる</li>
            <li>childrenを使った新しいレイアウトコンポーネントを作ってみる</li>
          </ol>
        </div>
      </section>
    </div>
  );
};