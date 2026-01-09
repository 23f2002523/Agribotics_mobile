# Environment Configuration

## Development
Copy `.env.example` files and rename to `.env`

## Production
Use environment-specific files:
- `.env.development`
- `.env.staging`
- `.env.production`

## Required Variables

### API Service
- MONGODB_URL
- SECRET_KEY
- WEATHER_API_KEY
- MANDI_API_KEY

### Mobile App
- API_BASE_URL
- ENVIRONMENT (dev/staging/prod)
