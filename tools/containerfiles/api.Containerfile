ARG SDK_VERSION=9.0

# Base Stage
FROM mcr.microsoft.com/dotnet/sdk:${SDK_VERSION} AS base

ARG SERVER_DIR=./server
ARG HTTP_PORT=80
ARG HTTPS_PORT=443

WORKDIR /app
COPY ${SERVER_DIR} .
RUN dotnet restore WebblServer.slnx
EXPOSE ${HTTP_PORT}
EXPOSE ${HTTPS_PORT}

# Development Target
FROM base AS development
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS=http://+:${HTTP_PORT};https://+:${HTTPS_PORT}
ENTRYPOINT ["dotnet", "watch", "run", "--project", "Api/Api.csproj"]
CMD ["--no-restore", "--non-interactive"]

# Production Build Stage
FROM base AS prod-builder
RUN dotnet publish -c Release -o ./publish --no-restore

# Production Stage
FROM mcr.microsoft.com/dotnet/aspnet:${SDK_VERSION} AS production
WORKDIR /app
COPY --from=prod-builder /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:${HTTP_PORT};https://+:${HTTPS_PORT}
ENTRYPOINT ["dotnet", "Webbl.Api.dll"]
