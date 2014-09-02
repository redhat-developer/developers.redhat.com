require 'gpgme'

module JBoss
  module Developer
    class Vault

      def initialize filename: nil
        @crypto = GPGME::Crypto.new
        @filename = filename
      end

      def execute site
        begin
          fname = File.open @filename || Pathname.new(site.config.config_dir).join('secrets.yaml.gpg').to_s
          secrets = YAML.load(@crypto.decrypt(fname).to_s)
          secrets.each do |k, v|
            ENV[k] = v
          end
        rescue GPGME::Error::DecryptFailed => e
          puts "Unable to decrypt vault (#{e})"
        end
      end

    end
  end
end

