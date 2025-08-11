// apps/api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get config service
  const configService = app.get(ConfigService);

  // Global prefix for all routes
  const apiPrefix = configService.get<string>('API_PREFIX', 'api/v1');
  app.setGlobalPrefix(apiPrefix);

  // Enable CORS for frontend
  app.enableCors({
    origin: [
      'http://localhost:3000', // NextJS dev server
      'http://localhost:3001', // Alternative port
      configService.get<string>('FRONTEND_URL', 'http://localhost:3000'),
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
    ],
  });

  // Global validation pipe with transform
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: configService.get('NODE_ENV') === 'production',
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Get port and environment for URLs
  const port = configService.get<number>('PORT', 3001);
  const environment = configService.get('NODE_ENV', 'development');

  // Swagger documentation (only in development)
  if (environment !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('TaskFlow API')
      .setDescription('Project Management System API - Jira-like functionality with drag & drop support')
      .setVersion('1.0')
      .addTag('Authentication', 'User authentication endpoints')
      .addTag('Projects', 'Project management endpoints')
      .addTag('Issues', 'Issue tracking with drag & drop support')
      .addTag('Sprints', 'Sprint management for Agile workflows')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .addServer(`http://localhost:${port}`, 'Development server')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
      customSiteTitle: 'TaskFlow API Documentation',
    });
  }

  await app.listen(port);

  // ✅ Enhanced startup logs with clear Swagger path
  console.log(`\n🚀 TaskFlow API Server Started`);
  console.log(`   Environment: ${environment}`);
  console.log(`   Port: ${port}`);
  console.log(`   API Base URL: http://localhost:${port}/${apiPrefix}`);

  if (environment !== 'production') {
    console.log(`\n📖 API Documentation (Swagger):`);
    console.log(`   URL: http://localhost:${port}/${apiPrefix}/docs`);
    console.log(`   Features: JWT Auth, Drag & Drop APIs, Auto-validation`);
  }

  console.log(`\n🔗 Available Endpoints:`);
  console.log(`   POST /auth/login        - User authentication`);
  console.log(`   GET  /projects          - List user projects`);
  console.log(`   POST /issues/{id}/move-status - Kanban drag & drop`);
  console.log(`   POST /issues/{id}/move-to-sprint - Sprint planning`);

  if (environment === 'development') {
    console.log(`\n🎯 Ready for Frontend Integration!`);
    console.log(`   Frontend URL: http://localhost:3000`);
    console.log(`   API Endpoint: http://localhost:${port}/${apiPrefix}`);
    console.log(`   Swagger Docs: http://localhost:${port}/${apiPrefix}/docs`);
  }
}

bootstrap().catch((error) => {
  console.error('❌ Failed to start TaskFlow API:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});