
# generate documentation
cd docgen
npm run build

# copy to docs
cd ..
cp docgen/dist/index.html docs/index.html