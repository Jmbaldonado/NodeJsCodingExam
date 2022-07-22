import { ApolloDriverConfig } from '@nestjs/apollo';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import * as depthLimit from 'graphql-depth-limit';
import { HttpStatus, Logger } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import {
  APP_ENV,
  ENABLE_GRAPHQL_TRACING,
  GRAPHQL_DEPTH_LIMIT,
} from '@modules/common/environment';

export class GraphqlService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile: join(process.cwd(), 'src/data/schema.gql'),
      playground: ENABLE_GRAPHQL_TRACING && {
        settings: {
          'queryPlan.hideQueryPlanResponse': false,
          'request.credentials': 'include',
        },
      },
      introspection: ENABLE_GRAPHQL_TRACING,
      useGlobalPrefix: true,
      validationRules: [
        depthLimit(GRAPHQL_DEPTH_LIMIT, { ignore: [/_trusted$/] }, (depths) => {
          if (depths[''] === GRAPHQL_DEPTH_LIMIT - 1) {
            Logger.warn(
              `You can only descend ${GRAPHQL_DEPTH_LIMIT} levels.`,
              'GraphQL',
              false,
            );
          }
        }),
      ],
      formatError: (error: ApolloError) => {
        Logger.error(
          error.message,
          JSON.stringify(error.extensions?.exception),
          error.source?.body,
        );
        const exceptionResponse = GraphqlService.customizeError(error);

        return {
          message: exceptionResponse.messages[0].message,
          path: error.path,
          locations: error.locations,
          extensions: {
            code: error.extensions?.code,
            exception: {
              response: exceptionResponse,
            },
          },
        };
      },
    };
  }

  private static customizeError(error: ApolloError) {
    const statusCode =
      error.extensions?.exception?.status ||
      error.extensions?.response?.statusCode ||
      HttpStatus.INTERNAL_SERVER_ERROR;
    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      return {
        statusCode,
        messages: [
          {
            title: 'Something went wrong',
            message:
              'Sorry, we are having technical difficulties. Please try again later.',
          },
        ],
        stacktrace: APP_ENV !== 'production' ? error?.stack : undefined,
      };
    }

    const response = error.extensions?.exception || error.extensions?.response;
    let messages = [
      {
        title: response?.error ?? error.message,
        message: error.message,
      },
    ];
    if (Array.isArray(response?.message)) {
      messages = response?.message.map((m) => {
        return {
          title: response?.error ?? error.message,
          message: m,
        };
      });
    }
    return {
      errorCode: response?.errorCode ?? response?.response?.errorCode,
      data: response?.data ?? response?.response?.data,
      statusCode,
      messages,
      stacktrace: APP_ENV !== 'production' ? error?.stack : undefined,
    };
  }
}
