export default function ApiSelector({ selectedApi, onSelectApi }) {
    const apis = [
      { id: 'binance', name: 'Binance' },
      { id: 'coingecko', name: 'CoinGecko' },
      { id: 'kraken', name: 'Kraken' },
    ];
  
    return (
      <div className="flex justify-center space-x-4">
        {apis.map((api) => (
          <button
            key={api.id}
            onClick={() => onSelectApi(api.id)}
            className={`px-4 py-2 rounded-md ${
              selectedApi === api.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {api.name}
          </button>
        ))}
      </div>
    );
  }