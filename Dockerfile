# Use the official Microsoft .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files and restore as distinct layers
COPY ["Tienda.API/Tienda.API.csproj", "Tienda.API/"]
COPY ["Tienda.Application/Tienda.Application.csproj", "Tienda.Application/"]
COPY ["Tienda.Domain/Tienda.Domain.csproj", "Tienda.Domain/"]
COPY ["Tienda.Infrastructure/Tienda.Infrastructure.csproj", "Tienda.Infrastructure/"]

RUN dotnet restore "Tienda.API/Tienda.API.csproj"

# Copy the remaining source code and build the app
COPY . .
WORKDIR "/src/Tienda.API"
RUN dotnet build "Tienda.API.csproj" -c Release -o /app/build

# Publish the app
FROM build AS publish
RUN dotnet publish "Tienda.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
ENV ASPNETCORE_HTTP_PORTS=8080
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Tienda.API.dll"]
